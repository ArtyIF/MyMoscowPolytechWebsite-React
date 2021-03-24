var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

const getDirectories = source => fs.readdirSync(source, { withFileTypes: true }).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);

router.get('/years', function(req, res, next) {
    let yearIDs = getDirectories(path.join(__dirname, '..', 'public', 'labs'));
    let yearsDictList = [];
    yearIDs.map((value) => {
        let humanName = value + "-й год";
        if (fs.existsSync(path.join(__dirname, '..', 'public', 'labs', value, 'humanname'))) {
            humanName = fs.readFileSync(path.join(__dirname, '..', 'public', 'labs', value, 'humanname'), 'utf8');
        }
        yearsDictList.push({id: value, humanName: humanName});
    });
    res.json(yearsDictList);
});

router.get('/humanname', function (req, res, next) {
    if (!req.query.year && !req.query.discipline && !req.query.lab) {
        res.status(400).send('Неверный запрос');
        return;
    }
    let humanName = req.query.year + "-й год";
    if (fs.existsSync(path.join(__dirname, '..', 'public', 'labs', req.query.year, 'humanname'))) {
        humanName = fs.readFileSync(path.join(__dirname, '..', 'public', 'labs', req.query.year, 'humanname'), 'utf8');
    }
    res.send(humanName);
})

router.get('/disciplines', function(req, res, next) {
    if (!req.query.year) {
        res.status(400).send('400');
        return;
    }
    let disciplineIDs = getDirectories(path.join(__dirname, '..', 'public', 'labs', req.query.year));
    let disciplinesDictList = [];
    disciplineIDs.map((value) => {
        let humanName = "Нет humanname! (ID: " + value + ")";
        if (fs.existsSync(path.join(__dirname, '..', 'public', 'labs', req.query.year, value, 'humanname'))) {
            humanName = fs.readFileSync(path.join(__dirname, '..', 'public', 'labs', req.query.year, value, 'humanname'), 'utf8');
        }
        disciplinesDictList.push({id: value, humanName: humanName});
    });
    res.json(disciplinesDictList);
});

function naturalCompare(a, b) {
    var ax = [], bx = [];

    a.replace(/(\d+)|(\D+)/g, function(_, $1, $2) { ax.push([$1 || Infinity, $2 || ""]) });
    b.replace(/(\d+)|(\D+)/g, function(_, $1, $2) { bx.push([$1 || Infinity, $2 || ""]) });
    
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
    let labsDictList = [];
    labIDs.map((value) => {
        let humanName = "Лабораторная работа " + value;
        if (fs.existsSync(path.join(__dirname, '..', 'public', 'labs', req.query.year, req.query.discipline, value, 'humanname'))) {
            humanName = fs.readFileSync(path.join(__dirname, '..', 'public', 'labs', req.query.year, req.query.discipline, value, 'humanname'), 'utf8');
        }
        labsDictList.push({id: value, humanName: humanName});
    });
    res.json(labsDictList);
});

module.exports = router;
