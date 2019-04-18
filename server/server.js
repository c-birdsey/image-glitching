const cors = require('cors');

const express = require('express');
const bodyParser = require('body-parser');
const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig[process.env.NODE_ENV || 'development']);

const { Model } = require('objection');
const User = require('./models/User.js');

Model.knex(knex);

const app = express();

const corsOptions = {
  methods: ['GET', 'POST'],
  origin: '*',
  allowedHeaders: ['Content-Type', 'Accept', 'X-Requested-With', 'Origin']
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

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

// TODO: Add any middleware here

// comparing authentication tokens
const authenticate = userReq => {
  User.query()
    .where('token', userReq.token)
    .then(foundUser => {
      if (foundUser.username == userReq.username) {
        return true;
      } else {
        return false;
      }
    });
};

// adding a new user
app.post('/register', (request, response, next) => {
  const newUser = request.body;
  const hashedPassword = User.hash(newUser.password);

  newUser.password = hashedPassword;
  newUser.token = User.generateToken();

  User.query()
    .insertAndFetch(newUser)
    .then(addedUser => {
      response.send(addedUser);
    }, next);
});

// authentication
app.post('/login', (request, response, next) => {
  const usernameReq = request.body.username;
  const passwordReq = request.body.password;

  User.query()
    .where('username', usernameReq)
    .then(foundUsers => {
      if (User.checkPassword(passwordReq, foundUsers[0].password)) {
        const newToken = User.generateToken();
        // updates users token on sign in
        User.query()
          .findById(foundUsers[0].id)
          .patchAndFetchById(foundUsers[0].id, { token: newToken })
          .then(regUser => {
            response.send(regUser);
          }, next);
      } else {
        response.sendStatus(401);
      }
    }, next);
});

module.exports = {
  app,
  knex
};
