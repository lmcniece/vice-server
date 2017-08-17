var _ = require('lodash')
var express = require('express');
var router = express.Router();
var User = require('../models/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
    User.findAll()
        .then(function (result) {
            if (!result) {
                return res.json(404, 'Not found');
            }
    
            res.json({result});
        })
        .error(function (err) {
            res.json(500, err.message);
        });
});

router.get('/:userId', function(req, res, next) {
    User.findById(req.param('userId'))
        .then(function (result) {
            if (!result) {
                return res.json(404, 'Not found');
            }
    
            res.json({result});
        })
        .error(function (err) {
            res.json(500, err.message);
        });
});

module.exports = router;