var passport = require('passport');
var helpers = require('./helpers');

exports.authenticate = function(req, res, next) {
	var auth = passport.authenticate('local', function(err, user) {
		if(err) { return next(err); }
		if(!user) { res.send({success: false}); }
		req.logIn(user, function(err) {
			if(err) { return next(err) }
			res.send({success:true, user: helpers.frontendUserData(req.user)})
		});
	});
	auth(req, res, next);
};

exports.requiresApiLogin = function(req, res, next) {
	if(!req.isAuthenticated()) {
		res.status(403);
		res.end();
	} else {
		next();
	}
};