var Sequelize = require('sequelize'),
    sequelize = require('../config/db').instance;

var User = sequelize.define('User', {
        username: Sequelize.STRING,
        given_name: Sequelize.STRING,
        surname: Sequelize.STRING
    });

module.exports = User;