#!/usr/bin/env node

/**
 * Module dependencies.
 */
require('dotenv').config();
const http = require('http');
const debug = require('debug')('todo-api:server');

const app = require('../server');

/**
 * Importing DB requirments
 */
const connectDb = require('../database/mongoConnection');

let port = '5000';

/**
 * Normalize a port into a number, string, or false.
 * @param {number} port
 */

/**
 * Event listener for HTTP server "error" event.
 */

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      debug(`Port ${port} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      debug(`Port ${port} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/**
 * Get port from environment and store in Express.
 */

port = process.env.PORT || '5000';
app.set('port', port);
app.listen(port,()=>{
  console.log("server running successfully");
})

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen to the port
 */
const onListening = () => {
  const addr = server.address();
  debug(`Listening on port ${addr.port}`);
};

/**
 * Listen on provided port, on all network interfaces.
//  */
// connectDb()
//   .then(async () => {
//     server.listen(port);
//     server.on('error', onError);
//     server.on('listening', onListening);
//   })
//   .catch((err) => {
//     debug(`Server not started ${err.message}`);
//   });
