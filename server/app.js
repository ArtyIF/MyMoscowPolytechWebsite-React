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

// app.use(express.static(path.join(__dirname, '..', 'client', 'public'))); // несобранная статика
app.use(express.static(path.join(__dirname, 'public'))); // лабы

app.use(express.static(path.join(__dirname, '..', 'client', 'build'))); // собранная статика
app.use('/api', apiRouter);
app.use('/index.php', function(req, res) {
    res.redirect(301, '/');
});
app.use('/view.php', function(req, res) {
    res.redirect(301, '/labs/y_1/d_' + req.query.disc + '/l_' + req.query.lr + '/p_' + req.query.sect);
});
app.use('/webapp_lr3_task3.html', function(req, res) {
    res.redirect(301, '/labs/y_1/d_webapp/l_3/p_3');
});
app.use('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
});

module.exports = app;
