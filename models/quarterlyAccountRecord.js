var Sequelize = require('sequelize'),
    sequelize = require('../config/db').instance;

var quarterlyAccountRecord = sequelize.define('quarterlyAccountRecord', {
        year: Sequelize.INTEGER,
        quarter: Sequelize.INTEGER,
        month: Sequelize.INTEGER,
        balance_end: Sequelize.DECIMAL,
        account_type: Sequelize.STRING
    }, {
        timestamps: false,
        tableName: "account_records"
    })
;

module.exports = quarterlyAccountRecord;