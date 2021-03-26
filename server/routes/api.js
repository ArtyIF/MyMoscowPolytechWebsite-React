var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

const getDirectories = source => fs.readdirSync(source, { withFileTypes: true }).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);
const getFiles = source => fs.readdirSync(source, { withFileTypes: true }).filter(dirent => dirent.isFile()).map(dirent => dirent.name);

function getHumanName(year, discipline, lab) {
    let humanName;
    if (year && discipline && lab) {
        humanName = 'Лабораторная работа ' + lab;
        if (fs.existsSync(path.join(__dirname, '..', 'public', 'labfiles', year, discipline, lab, 'humanname'))) {
            humanName = fs.readFileSync(path.join(__dirname, '..', 'public', 'labfiles', year, discipline, lab, 'humanname'), 'utf8');
        }
    } else if (year && discipline) {
        humanName = 'Нет humanname! (ID: ' + discipline + ')';
        if (fs.existsSync(path.join(__dirname, '..', 'public', 'labfiles', year, discipline, 'humanname'))) {
            humanName = fs.readFileSync(path.join(__dirname, '..', 'public', 'labfiles', year, discipline, 'humanname'), 'utf8');
        }
    } else if (year) {
        humanName = year + '-й курс';
        if (fs.existsSync(path.join(__dirname, '..', 'public', 'labfiles', year, 'humanname'))) {
            humanName = fs.readFileSync(path.join(__dirname, '..', 'public', 'labfiles', year, 'humanname'), 'utf8');
        }
    } else {
        return 'Неверный запрос';
    }
    return humanName;
}

router.get('/humanname', function (req, res) {
    res.send(getHumanName(req.query.year, req.query.discipline, req.query.lab));
});

router.get('/years', function(req, res) {
    let yearIDs = getDirectories(path.join(__dirname, '..', 'public', 'labfiles'));
    let yearIDsWithHumanNames = {ids: yearIDs, humanNames: []};
    yearIDs.forEach(year => {
        yearIDsWithHumanNames.humanNames.push(getHumanName(year));
    });
    res.json(yearIDsWithHumanNames);
});

router.get('/disciplines', function(req, res) {
    if (!req.query.year) {
        res.status(400).send('Неверный запрос');
        return;
    }
    let disciplineIDs = getDirectories(path.join(__dirname, '..', 'public', 'labfiles', req.query.year));
    let disciplineIDsWithHumanNames = {ids: disciplineIDs, humanNames: []};
    disciplineIDs.forEach(discipline => {
        disciplineIDsWithHumanNames.humanNames.push(getHumanName(req.query.year, discipline));
    });
    res.json(disciplineIDsWithHumanNames);
});

function naturalCompare(a, b) {
    var ax = [], bx = [];

    a.replace(/(\d+)|(\D+)/g, function(_, $1, $2) { ax.push([$1 || Infinity, $2 || '']); });
    b.replace(/(\d+)|(\D+)/g, function(_, $1, $2) { bx.push([$1 || Infinity, $2 || '']); });
    
    while(ax.length && bx.length) {
        var an = ax.shift();
        var bn = bx.shift();
        var nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
        if(nn) return nn;
    }

    return ax.length - bx.length;
}

router.get('/labs', function(req, res) {
    if (!req.query.year || !req.query.discipline) {
        res.status(400).send('Неверный запрос');
        return;
    }
    let labIDs = getDirectories(path.join(__dirname, '..', 'public', 'labfiles', req.query.year, req.query.discipline));
    labIDs.sort(naturalCompare);
    let labIDsWithHumanNames = {ids: labIDs, humanNames: []};
    labIDs.forEach(lab => {
        labIDsWithHumanNames.humanNames.push(getHumanName(req.query.year, req.query.discipline, lab));
    });
    res.json(labIDsWithHumanNames);
});

router.get('/lab', function(req, res) {
    if (!req.query.year || !req.query.discipline || !req.query.lab) {
        res.status(400).send('Неверный запрос');
        return;
    }
    let labPageIDs = getFiles(path.join(__dirname, '..', 'public', 'labfiles', req.query.year, req.query.discipline, req.query.lab));
    labPageIDs.sort(naturalCompare);
    res.json(labPageIDs);
});

module.exports = router;
