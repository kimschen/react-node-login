var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

// Serves index.html
app.use(express.static(__dirname +'./../../'));

// Handle post request
app.post('/', function (req, res) {
    console.log('POST request received');
});

// Listen -> http://localhost:3000/
app.listen(3000);
