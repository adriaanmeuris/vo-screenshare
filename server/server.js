const express = require('express');
const router = express.Router();

// Create the express application.
const app = express();

// set listening port
const port = process.env.PORT || 8080;
app.set('port', port);

router.get('/test', function (req, res) {
    res.status(200).send('Express server running');
});

app.use(express.static('app/dist'));

// start listening
const server = app.listen(app.get('port'), () => {
    console.log(`Express is listening on port ${app.get('port')}`);
});


// Export the server
module.exports.server = server;
