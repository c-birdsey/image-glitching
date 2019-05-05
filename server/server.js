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

const { Model } = require('objection');
const User = require('./models/User');
const Image = require('./models/Image');

Model.knex(knex);

const { ValidationError } = require('objection');
const { wrapError, DBError } = require('db-errors');

const app = express();

const corsOptions = {
  methods: ['GET', 'POST'],
  origin: '*',
  allowedHeaders: ['Content-Type', 'Accept', 'X-Requested-With', 'Origin']
};

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.use(cors(corsOptions));
app.use(bodyParser.json());

// development purposes
const sessionSecret = 'foo4321!';

app.use(
  session({
    secret: sessionSecret,
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

app.get('/api/images', (request, response, next) => {
  Image.query().then(images => {
    response.send(images);
  }, next);
});

app.post('/api/images', (request, response, next) => {
  console.log(request.body.test);
  if (!request.body.data) {
    throw new ValidationError({
      statusCode: 400,
      message: 'No image was provided'
    });
  }
  const newImage = request.body;
  Image.query()
    .insertAndFetch(newImage)
    .then(image => {
      response.send(image);
    }, next);
});

app.post(
  '/login',
  passport.authenticate('bearer', { session: true }),
  (request, response, next) => {
    response.sendStatus(200);
  }
);

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

module.exports = {
  app,
  knex
};
