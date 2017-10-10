var sequelize = require('../../config/db').instance;
var express = require('express');
var router = express.Router();
var accountRecord = require('../../models/accountRecord');

module.exports = function (router) {
    router.get('/', function(req, res, next) {
        accountRecord.findAll()
            .then(function (result) {
                if (!result) {
                    return res.json(404, 'Not found');
                }
                res.json({accountRecords: result});
            })
            .error(function (err) {
                res.json(500, err.message);
            });
    });
};