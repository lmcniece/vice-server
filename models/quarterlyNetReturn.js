var Sequelize = require('sequelize'),
    sequelize = require('../config/db').instance;

var quarterlyNetReturn = sequelize.define('quarterlyNetReturn', {
        year: Sequelize.INTEGER,
        quarter: Sequelize.INTEGER,
        month: Sequelize.INTEGER,
        net: Sequelize.DECIMAL,
        account_type: Sequelize.STRING
    }, {
        timestamps: false,
        tableName: "account_records"
    })
;

module.exports = quarterlyNetReturn;