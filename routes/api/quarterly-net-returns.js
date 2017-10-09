var Sequelize = require('sequelize');
var sequelize = require('../../config/db').instance;
var express = require('express');
var router = express.Router();
var quarterlyNetReturn = require('../../models/quarterlyNetReturn');

module.exports = function (router) {
    router.get('/', function(req, res, next) {
        quarterlyNetReturn.findAll({
                attributes: [
                    'id','account_type',
                    [sequelize.fn('YEAR',sequelize.col('date')),'year'],
                    [sequelize.fn('QUARTER',sequelize.col('date')),'quarter'],
                    [sequelize.fn('SUM', sequelize.literal('deposits - withdrawals + market_change + dividend_interest')),'net']
                ],
                order: [
                    ['date', 'ASC']
                ],
                group: [
                    sequelize.fn('YEAR',sequelize.col('date')),sequelize.fn('QUARTER',sequelize.col('date')),'account_type'
                ]
            })
            .then(function (result) {
                if (!result) {
                    return res.json(404, 'Not found');
                }
                res.json({quarterlyNetReturns: result});
            })
            .error(function (err) {
                res.json(500, err.message);
            });
    });
};