var Sequelize = require('sequelize');
var sequelize = require('../../config/db').instance;
var express = require('express');
var router = express.Router();
var quarterlyAccountRecord = require('../../models/quarterlyAccountRecord');

module.exports = function (router) {
    router.get('/', function(req, res, next) {
        quarterlyAccountRecord.findAll({
                attributes: [
                    'id','account_type',
                    [sequelize.fn('YEAR',sequelize.col('date')),'year'],
                    [sequelize.fn('QUARTER',sequelize.col('date')),'quarter'],
                    [sequelize.fn('SUM', sequelize.col('balance_end')),'balance_end']
                ],
                where : sequelize.where(sequelize.fn('MONTH',sequelize.col('date')), {$in: [3,6,9,12]}),
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
                res.json({quarterlyAccountRecords: result});
            })
            .error(function (err) {
                res.json(500, err.message);
            });
    });
};