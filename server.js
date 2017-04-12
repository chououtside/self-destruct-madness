const express = require('express');

// Middleware
const morgan = require('morgan');
const parser = require('body-parser');

const app = express();
module.exports.app = app;

let port = process.env.PORT || 9000;

// Set what we are listening on.
app.set('port', port);

app.use(morgan('dev'));
app.use(parser.urlencoded({extended: true}));
app.use(parser.json());

// Serve the client files
app.use(express.static(__dirname));

// If we are being run directly, run the server.
if (!module.parent) {
  app.listen(app.get('port'));
  console.log('Listening on', app.get('port'));
}
