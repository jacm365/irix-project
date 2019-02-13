var express = require('express'), 
	sequelize = require('sequelize'),
	passport = require('passport'),
	glob = require( 'glob' ),
	path = require( 'path' ),
	localStrategy = require('passport-local').Strategy;

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

var config = require('./server/config/config')[env];

var connection = require('./server/config/sequelize')(models, config, sequelize);

var models = {};

glob.sync( './server/config/database-models/*.js' ).forEach( function(file) {
	var model = path.basename(file, '.js');
	models[model] = require(path.resolve(file))(sequelize, connection);
});

require('./server/config/model-relations')(models);

require('./server/config/express')(app, config, passport);

require('./server/config/passport')(models, passport, localStrategy);

require('./server/config/routes')(app, models);

app.listen(config.port);

console.log('Listening on port ' + config.port + '...');