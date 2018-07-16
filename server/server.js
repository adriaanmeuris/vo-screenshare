const express = require('express');

// Create the express application.
const app = express();

// set listening port
app.set('port', 8080);

// start listening
const server = app.listen(app.get('port'), () => {
  console.log(`Express is listening on port ${app.get('port')}`);
});

// Export the server
module.exports.server = server;