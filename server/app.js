var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var apiRouter = require('./routes/api');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, '..', 'client', 'public'))); // несобранная статика
app.use(express.static(path.join(__dirname, '..', 'client', 'build'))); // собранная статика
app.use(express.static(path.join(__dirname, 'public'))); // лабы

app.use('/api', apiRouter);

module.exports = app;
