var Sequelize = require('sequelize'),
    sequelize = require('../config/db').instance;

var accountRecord = sequelize.define('accountRecord', {
        year: Sequelize.INTEGER,
        month: Sequelize.INTEGER,
        balance_start: Sequelize.DECIMAL,        
        balance_end: Sequelize.DECIMAL,
        market_change: Sequelize.DECIMAL,
        dividend_interest: Sequelize.DECIMAL,
        fees: Sequelize.DECIMAL,
        deposits: Sequelize.DECIMAL,
        withdrawals: Sequelize.DECIMAL,
        account: Sequelize.STRING,
        account_type: Sequelize.STRING
    }, {
        timestamps: false,
        tableName: "account_records"
    })
;

module.exports = accountRecord;