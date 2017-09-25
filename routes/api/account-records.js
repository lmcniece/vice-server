var _ = require('lodash');
var sequelize = require('../../config/db').instance;
var express = require('express');
var router = express.Router();
var accountRecord = require('../../models/AccountRecord');

module.exports = function (router) {
    router.get('/', function(req, res, next) {
        accountRecord.findAll({
                order: [
                    ['year', 'ASC'],
                    ['month', 'ASC']
                ]
            })
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
        
    router.get('/:account', function(req, res, next) {
        accountRecord.findAll({
                where: {'account': req.param('account')},
                order: [
                    ['year', 'ASC'],
                    ['month', 'ASC']
                ]
            })
            .then(function (result) {
                if (!result) {
                    return res.json(404, 'Not found');
                }
                res.json({historicalInvestments: result});
            })
            .error(function (err) {
                res.json(500, err.message);
            });
    });
};