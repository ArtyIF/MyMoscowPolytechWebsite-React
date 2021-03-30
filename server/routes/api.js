var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

const getDirectories = source => fs.readdirSync(source, { withFileTypes: true }).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);
const getFiles = source => fs.readdirSync(source, { withFileTypes: true }).filter(dirent => dirent.isFile()).map(dirent => dirent.name);
const humanNames = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'public', 'humannames.json'), 'utf8'));

function getHumanName(year, discipline, lab) {
    let humanName = '';
    if (year && discipline && lab) {
        humanName = humanNames.placeholders['/labs/y_*/d_*/l_$'].replace('$', lab);
        if (humanNames.custom['/labs/y_' + year + '/d_' + discipline + '/l_' + lab]) {
            humanName = humanNames.custom['/labs/y_' + year + '/d_' + discipline + '/l_' + lab];
        }
    } else if (year && discipline) {
        humanName = humanNames.placeholders['/labs/y_*/d_$'].replace('$', discipline);
        if (humanNames.custom['/labs/y_' + year + '/d_' + discipline]) {
            humanName = humanNames.custom['/labs/y_' + year + '/d_' + discipline];
        }
    } else if (year) {
        humanName = humanNames.placeholders['/labs/y_$'].replace('$', year);
        if (humanNames.custom['/labs/y_' + year]) {
            humanName = humanNames.custom['/labs/y_' + year];
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
    let labPages = getFiles(path.join(__dirname, '..', 'public', 'labfiles', req.query.year, req.query.discipline, req.query.lab));
    let labPageIDs = [];
    labPages.forEach(val => {
        if (val !== 'humanname') {
            labPageIDs.push(val.split('.').slice(0, -1).join('.'));
        }
    });
    labPageIDs.sort(naturalCompare);
    res.json(labPageIDs);
});

router.get('/page', function(req, res) {
    if (!req.query.year || !req.query.discipline || !req.query.lab || !req.query.page) {
        res.status(400).send('Неверный запрос');
        return;
    }
    let labPages = getFiles(path.join(__dirname, '..', 'public', 'labfiles', req.query.year, req.query.discipline, req.query.lab));
    let labPageIDs = [];
    labPages.forEach((val, i) => {
        labPageIDs[i] = val.split('.').slice(0, -1).join('.');
    });
    let foundID = labPageIDs.indexOf(req.query.page);
    if (foundID !== -1) {
        res.sendFile(path.join(__dirname, '..', 'public', 'labfiles', req.query.year, req.query.discipline, req.query.lab, labPages[foundID]));
    } else {
        res.status(404).send('Страница не найдена');
    }
});

module.exports = router;
