var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

const getDirectories = source => fs.readdirSync(source, { withFileTypes: true }).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);

router.get('/humanname', function (req, res, next) {
    let humanName;
    if (req.query.year && req.query.discipline && req.query.lab) {
        humanName = 'Лабораторная работа ' + req.query.lab;
        if (fs.existsSync(path.join(__dirname, '..', 'public', 'labs', req.query.year, req.query.discipline, req.query.lab, 'humanname'))) {
            humanName = fs.readFileSync(path.join(__dirname, '..', 'public', 'labs', req.query.year, req.query.discipline, req.query.lab, 'humanname'), 'utf8');
        }
    } else if (req.query.year && req.query.discipline) {
        humanName = 'Нет humanname! (ID: ' + req.query.discipline + ')';
        if (fs.existsSync(path.join(__dirname, '..', 'public', 'labs', req.query.year, req.query.discipline, 'humanname'))) {
            humanName = fs.readFileSync(path.join(__dirname, '..', 'public', 'labs', req.query.year, req.query.discipline, 'humanname'), 'utf8');
        }
    } else if (req.query.year) {
        humanName = req.query.year + '-й курс';
        if (fs.existsSync(path.join(__dirname, '..', 'public', 'labs', req.query.year, 'humanname'))) {
            humanName = fs.readFileSync(path.join(__dirname, '..', 'public', 'labs', req.query.year, 'humanname'), 'utf8');
        }
    } else {
        res.status(400).send('Неверный запрос');
        return;
    }
    res.send(humanName);
});

router.get('/years', function(req, res, next) {
    let yearIDs = getDirectories(path.join(__dirname, '..', 'public', 'labs'));
    res.json(yearIDs);
});

router.get('/disciplines', function(req, res, next) {
    if (!req.query.year) {
        res.status(400).send('400');
        return;
    }
    let disciplineIDs = getDirectories(path.join(__dirname, '..', 'public', 'labs', req.query.year));
    res.json(disciplineIDs);
});

function naturalCompare(a, b) {
    var ax = [], bx = [];

    a.replace(/(\d+)|(\D+)/g, function(_, $1, $2) { ax.push([$1 || Infinity, $2 || '']) });
    b.replace(/(\d+)|(\D+)/g, function(_, $1, $2) { bx.push([$1 || Infinity, $2 || '']) });
    
    while(ax.length && bx.length) {
        var an = ax.shift();
        var bn = bx.shift();
        var nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
        if(nn) return nn;
    }

    return ax.length - bx.length;
}

router.get('/labs', function(req, res, next) {
    if (!req.query.year || !req.query.discipline) {
        res.status(400).send('400');
        return;
    }
    let labIDs = getDirectories(path.join(__dirname, '..', 'public', 'labs', req.query.year, req.query.discipline));
    labIDs.sort(naturalCompare);
    res.json(labIDs);
});

module.exports = router;
