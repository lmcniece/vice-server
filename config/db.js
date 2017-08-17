var Sequelize = require('sequelize'),
    parseDbUrl = require("parse-database-url");
    dbConfig = parseDbUrl(process.env.CLEARDB_DATABASE_URL);
    serverConfig ={
        host: dbConfig.host,
        dialect: dbConfig.driver
    }
var db = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, serverConfig);

module.exports = {
    instance: db,
    init: function (done) {
        // Authenticate the db
        db.authenticate()
            .complete(function (err) {
                if (err) {
                    return done(err);
                }
                done();
            });
    }
};