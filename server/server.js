/* eslint-disable no-console */
/* eslint no-unused-vars: ["error", { "args": "none" }] */

const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig[process.env.NODE_ENV || 'development']);

const session = require('express-session');
const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const { OAuth2Client } = require('google-auth-library');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const { Model } = require('objection');
const User = require('./models/User');
const Image = require('./models/Image');
const Comment = require('./models/Comment');

Model.knex(knex);

const { wrapError, DBError } = require('db-errors');

const app = express();

const corsOptions = {
  methods: ['GET', 'POST'],
  origin: '*',
  allowedHeaders: ['Content-Type', 'Accept', 'X-Requested-With', 'Origin']
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.query()
    .findOne('id', id)
    .then(user => {
      done(null, user);
    });
});

passport.use(
  new BearerStrategy((token, done) => {
    googleClient
      .verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID
      })
      .then(async ticket => {
        const payload = ticket.getPayload();
        let user = await User.query().findOne('googleId', payload.sub);
        if (!user) {
          user = await User.query().insertAndFetch({
            googleId: payload.sub,
            familyName: payload.family_name,
            givenName: payload.given_name,
            email: payload.email
          });
        }
        done(null, user);
      })
      .catch(error => {
        done(error);
      });
  })
);

// express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  // Resolve client build directory as absolute path to avoid errors in express
  const path = require('path'); // eslint-disable-line global-require
  const buildPath = path.resolve(__dirname, '../client/build');

  app.use(express.static(buildPath));

  // Serve the HTML file included in the CRA client on the root path
  app.get('/', (request, response) => {
    response.sendFile(path.join(buildPath, 'index.html'));
  });
}

const authenticationMiddleware = (request, response, next) => {
  if (request.isAuthenticated()) {
    return next(); // we are good, proceed to the next handler
  }
  return response.sendStatus(403); // forbidden
};

// ---------- Error handling middleware ----------

app.use((error, request, response, next) => {
  if (response.headersSent) {
    next(error);
  }
  const wrappedError = wrapError(error);
  if (wrappedError instanceof DBError) {
    response.status(400).send(wrappedError.data || wrappedError.message || {});
  } else {
    response
      .status(wrappedError.statusCode || wrappedError.status || 500)
      .send(wrappedError.data || wrappedError.message || {});
  }
});

/* =============== Photo storage =============== */

const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

const folder = 'images';

const storage = cloudinaryStorage({
  cloudinary,
  folder
});

const parser = multer({ storage });

/* ============================================= */

// saves glitched image to profile
app.post(
  '/api/image/glitch',
  authenticationMiddleware,
  parser.single('image'),
  (req, res, next) => {
    const newImage = {
      url: req.file.url,
      original: req.body.original,
      createdAt: req.file.created_at,
      createdBy: req.user.id
    };
    Image.query()
      .insertAndFetch(newImage)
      .then(uploadedImage => {
        res.sendStatus(200);
      }, next);
  }
);

// saves original image to cloudinary
app.post(
  '/api/image/original',
  authenticationMiddleware,
  parser.single('image'),
  (req, res, next) => {
    res.status(200).send({ url: req.file.url });
  }
);

// returns all of a user's saved images
app.get('/profile/images', authenticationMiddleware, (req, res, next) => {
  Image.query()
    .where('createdBy', req.user.id)
    .then(images => {
      res.send(images);
    }, next);
});

// creates a new comment
app.post(
  '/api/image:id/comments',
  authenticationMiddleware,
  (req, res, next) => {
    const newComment = Object.assign({}, req.body, {
      image: req.params.id
    });
    Comment.query()
      .insertAndFetch(newComment)
      .then(comment => {
        res.send(comment);
      }, next);
  }
);

// returns comments for an image
app.get(
  '/api/image:id/comments',
  authenticationMiddleware,
  (req, res, next) => {
    Comment.query()
      .where('image', req.params.id)
      .then(comments => {
        res.send(comments);
      }, next);
  }
);

app.post(
  '/login',
  passport.authenticate('bearer', { session: true }),
  (req, res, next) => {
    res.sendStatus(200);
  }
);

module.exports = {
  app,
  knex
};
