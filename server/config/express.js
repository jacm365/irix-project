var express = require('express'), 
	stylus = require('stylus'),
	logger = require('morgan'),
	session = require('express-session'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser');

module.exports = function(app, config, passport) {
	function compile(str, path) {
		return stylus(str).set('filename', path);
	}

	app.set('views', config.rootPath + '/server/views');
	app.set('view engine', 'jade');
	app.use(logger('dev'));
	app.use(cookieParser());
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(session({ secret: 'irix awesome app', resave: false, saveUninitialized: false }));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(stylus.middleware({
		src: config.rootPath + '/public',
		compile: compile
	}));
	app.use(express.static(config.rootPath + '/public'));
}