var express = require('express');
    path = require('path');
    favicon = require('serve-favicon');
    logger = require('morgan');
    cookieParser = require('cookie-parser');
    bodyParser = require('body-parser');
    db = require('./config/db'),
    Prom = require('bluebird');
    enrouten = require('express-enrouten');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(enrouten({
    directory: 'routes'
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json(err.stack);
});

app.use(function(){
    new Prom(function (resolve, reject) {
        // Start the db connection
        db.init(function (err) {
            if (err) {
                return reject(new Error('Failed to initialize database: ' + err.message));
            }
            app.set('db', db.instance);
            resolve();
        });
    });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})

module.exports = app;