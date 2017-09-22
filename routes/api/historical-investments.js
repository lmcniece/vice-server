var _ = require('lodash');
var express = require('express');
var router = express.Router();
var HistoricalInvestment = require('../../models/HistoricalInvestment');

module.exports = function (router) {
    router.get('/', function(req, res, next) {
        HistoricalInvestment.findAll({
                order: [
                    ['account', 'ASC'],
                    ['year', 'ASC'],
                    ['month', 'ASC'],
                ],
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
        
    router.get('/:account', function(req, res, next) {
        HistoricalInvestment.findAll({
                where: {'account': req.param('account')}
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