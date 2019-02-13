var passport = require('passport');

exports.authenticate = function(req, res, next) {
	var auth = passport.authenticate('local', function(err, user) {
		if(err) { return next(err); }
		if(!user) { res.send({success: false}); }
		req.logIn(user, function(err) {
			if(err) { return next(err) }
			var userData = {
				id: req.user.id,
				name: req.user.firstname + " " + req.user.lastname,
				companyId: req.user.companyId
			}
			res.send({success:true, user: userData})
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