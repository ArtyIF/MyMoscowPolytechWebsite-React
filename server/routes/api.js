var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

const getDirectories = source => fs.readdirSync(source, { withFileTypes: true }).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);

router.get('/disciplines', function(req, res, next) {
    let disciplineIDs = getDirectories(path.join(__dirname, '..', 'public', 'labs'));
    let disciplinesDictList = [];
    disciplineIDs.map((value) => {
        let humanName = fs.readFileSync(path.join(__dirname, '..', 'public', 'labs', value, 'humanname'), 'utf8');
        disciplinesDictList.push({'id': value, 'name': humanName})
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
    let labIDs = getDirectories(path.join(__dirname, '..', 'public', 'labs', req.query.discipline));
    labIDs.sort(naturalCompare);
    let labsDictList = [];
    labIDs.map((value) => {
        let humanName = "Лабораторная работа " + value;
        if (fs.existsSync(path.join(__dirname, '..', 'public', 'labs', req.query.discipline, value, 'humanname'))) {
            humanName = fs.readFileSync(path.join(__dirname, '..', 'public', 'labs', req.query.discipline, value, 'humanname'), 'utf8');
        }
        labsDictList.push({'id': value, 'name': humanName});
    });
    res.json(labsDictList);
});

module.exports = router;
