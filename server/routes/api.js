var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

const getDirectories = source => fs.readdirSync(source, { withFileTypes: true }).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);
const getFiles = source => fs.readdirSync(source, { withFileTypes: true }).filter(dirent => dirent.isFile()).map(dirent => dirent.name);
const humanNames = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'public', 'humannames.json'), 'utf8'));

function getHumanName(path) {
    if (typeof humanNames.custom[path] !== 'undefined') {
        return humanNames.custom[path];
    } else {
        let finalValue = humanNames.default;
        let regexes = Object.keys(humanNames.templates);
        let values = Object.values(humanNames.templates);
        for (let i = 0; i < regexes.length; i++) {
            let currentRegex = new RegExp(regexes[i], 'g');
            let matches = currentRegex.exec(path);
            if (matches) {
                finalValue = values[i];
                for (let j = 0; j < matches.length; j++) {
                    finalValue = finalValue.replace('$' + j, matches[j]).replace('&dol;', '$').replace('&amp;', '&');
                }
                break;
            }
        }
        return finalValue;
    }
}

router.get('/humanname', function (req, res) {
    res.send(getHumanName(req.query.path));
});

router.get('/years', function(req, res) {
    let yearIDs = getDirectories(path.join(__dirname, '..', 'public', 'labfiles'));
    let yearIDsWithHumanNames = {ids: yearIDs, humanNames: []};
    yearIDs.forEach(year => {
        yearIDsWithHumanNames.humanNames.push(getHumanName('/labs/y_' + year));
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
        disciplineIDsWithHumanNames.humanNames.push(getHumanName('/labs/y_' + req.query.year + '/d_' + discipline));
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
        labIDsWithHumanNames.humanNames.push(getHumanName('/labs/y_' + req.query.year + '/d_' + req.query.discipline + '/l_' + lab));
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

router.get('/log', function(req, res) {
    fs.access(path.join(__dirname, '..', 'logger.log'), (err) => {
        if (err) {
            res.status(404).send('За эти сутки никто ещё пока ничего не отправлял');
        } else {
            res.sendFile(path.join(__dirname, '..', 'logger.log'));
        }
    });
});

module.exports = router;
