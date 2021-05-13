// PACKAGES //
var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var favicon = require('serve-favicon');
var dotenv = require("dotenv");
dotenv.config();

// IMPORTS //
var indexRoutes = require('./routes/index');

// CREATE APP //
var app = express();

// MIDDLEWARE //
app.use(express.static(path.join(__dirname, '../client')));

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(favicon(__dirname +  '/../client/img/favicon.ico'));

// ROUTES //
app.use('/', indexRoutes);

// ERROR HANDLER //
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
});

module.exports = app;
