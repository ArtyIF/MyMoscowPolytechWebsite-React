var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

const getDirectories = source => fs.readdirSync(source, { withFileTypes: true }).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name)

router.get('/disciplines', function(req, res, next) {
    let disciplineIDs = getDirectories(path.join(__dirname, '..', 'public', 'labs'));
    let disciplineDictList = [];
    disciplineIDs.map((value) => {
        let humanName = fs.readFileSync(path.join(__dirname, '..', 'public', 'labs', value, 'humanname'), 'utf8');
        disciplineDictList.push({'id': value, 'name': humanName})
    });
    res.json(disciplineDictList);
});

module.exports = router;
