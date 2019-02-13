var auth = require('./auth');
var helpers = require('./helpers');

module.exports = function(app, models) {
	app.get('/api/users/:companyId?', auth.requiresApiLogin, function(req, res) {
		
		var companyId = (req.params.companyId) ? req.params.companyId : null;
		/*
		* Only admin users don't send a companyId 
		* they have access to the entire collection of users
		*/
		if(companyId==null) {
			models.User.findAll().then(function(userData) {
				res.send(userData);
			});
		} else {
			models.User.findAll({
				where: {
					companyId: companyId
				}
			}).then(function(userData) {
				res.send(userData);
			});
		}
		
	});

	app.get('/partials/*', function(req, res)  {
		res.render('../../public/app/' + req.params[0]);
	});	

	app.post('/login', auth.authenticate);

	app.post('/logout', function(req, res) {
		req.logout();
		res.end();
	});

	app.get('*', function(req, res) {
		var userData;
		if(!(req.user == null)) {
			userData = helpers.frontendUserData(req.user);
		}
		res.render('index', {
			bootstrappedUser: userData
		});
	});
}