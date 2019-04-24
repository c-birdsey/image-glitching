/* eslint-disable no-console */
/* eslint no-unused-vars: ["error", { "args": "none" }] */

/* auth.js | Authentication controller */
const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { ValidationError } = require('objection');
const User = require('./models/User.js');

const router = express.Router();

// ========== Registration ==========

router.post('/register', (request, response, next) => {
  /* (1) check for missing or empty password
   * (2) generate a hashed password for the user
   * (3) generate 16 random bytes as token
   * (4) insert & fetch new user into database */
  if (!request.body.password) {
    throw new ValidationError({
      statusCode: 400,
      message: 'A password is required'
    });
  }
  const user = request.body;
  const hash = bcrypt.hashSync(user.password, 10);
  const token = crypto.randomBytes(16).toString('base64');
  user.password = hash;
  user.token = token;
  User.query()
    .insertAndFetch(user)
    .then(newUser => {
      response.status(201).send(newUser);
    }, next);
});

// ========== Login ==========

router.post('/login', (request, response, next) => {
  /* (1) validate request has a username and password
   * (2) find a user with a matching username
   * (3) check for a matching password
   * (4) if password matches, update the user's token */
  if (!request.body.username || !request.body.password) {
    response.sendStatus(400);
  } else {
    const reqName = request.body.username;
    const reqPass = request.body.password;
    User.query()
      .where('username', reqName)
      .first()
      .limit(1)
      .then(foundUser => {
        if (foundUser && bcrypt.compareSync(reqPass, foundUser.password)) {
          const newToken = crypto.randomBytes(16).toString('base64');
          User.query()
            .patchAndFetchById(foundUser.id, { token: newToken })
            .then(authUser => {
              response.status(200).send(authUser.authDetails());
            }, next);
        } else {
          response.sendStatus(401);
        }
      }, next);
  }
});

module.exports = router;
