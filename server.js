
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , fs = require('fs')
  , mongoose = require('mongoose');

// var uri = 'mongodb://heroku_app17242760:84n35dikv6npf2qnj24pnprclr@ds037758.mongolab.com:37758/heroku_app17242760';
// mongoose.connect(uri);

var dbURL = 'mongodb://localhost/test';
var db = mongoose.connect(dbURL);

var app = express();

// all environments
app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser({uploadDir: __dirname + '/tmp_files'}));
  app.use(express.methodOverride());
  app.use(express.cookieParser('I love Red'));
  app.use(express.cookieSession({ cookie: {maxAge: 60 * 60 * 1000}}));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

require('./routes/index')(app);
require('./routes/session')(app);
require('./routes/users')(app);
require('./routes/profile')(app);
require('./routes/login')(app);
require('./routes/logout')(app);
require('./routes/demo')(app);
require('./routes/upload')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
