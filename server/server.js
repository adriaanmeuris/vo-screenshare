const express = require('express');

// Create the express application.
const app = express();

// set listening port
const port = process.env.PORT || 8080;
app.set('port', port);

app.use(express.static('app/dist'));

// start listening
const server = app.listen(app.get('port'), () => {
  console.log(`Express is listening on port ${app.get('port')}`);
});


// Export the server
module.exports.server = server;
