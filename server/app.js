var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var restRouter = require('./routes/rest');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'client', 'public'))); // несобранная статика
app.use(express.static(path.join(__dirname, '..', 'client', 'build'))); // собранная статика
app.use(express.static(path.join(__dirname, 'public'))); // не знаю пригодится или нет но кто знает

app.use('/api', restRouter);

module.exports = app;
