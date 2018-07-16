// require modules
const express = require('express');
const app = express();
const http = require('http');
const port = process.env.PORT || 8080;

// set listening port
app.set('port', port);

// serve static files
app.use(express.static('app/dist'));

// create the server
app.server = http.createServer(app);

// setup rtc.io
const switchboard = require('rtc-switchboard')(app.server);

// test route
app.get('/test', function (req, res) {
    res.status(200).send('Express server running');
});

// listen
app.server.listen(app.get('port'), () => {
    console.log(`Express is listening on port ${app.get('port')}`);
});

// Export the server
//module.exports.server = server;
