var express = require('express');
var router = express.Router();

/* GET home page. */
module.exports = function (router) {
    router.get('/', function(req, res, next) {
        res.status(200).json({ message: 'Connected!' });
    });
}