const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const knexConfig = require('./knexfile');

const knex = require('knex')(knexConfig[process.env.NODE_ENV || 'development']);

const { Model } = require('objection');

const auth = require('./auth');

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

// all routes under auth prefix use authentication controller
app.use('/auth', auth);

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
