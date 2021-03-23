var express = require('express');
var router = express.Router();

router.get('/disciplines', function(req, res, next) {
    res.json([{"id": "zero", "name": "Ноль"}]);
});

module.exports = router;
