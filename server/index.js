/* eslint-disable no-console */
const http = require('http');
const { app } = require('./server.js');

const server = http.createServer(app).listen(process.env.PORT || 3001);
console.log('Listening on port %d', server.address().port);
