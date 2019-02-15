var auth = require('./auth');
var helpers = require('./helpers');
var usersService = require('./services/users');

module.exports = function(app, models) {
	
	/*
	* Users
	*/
	app.get('/api/users/:id?', auth.requiresApiLogin, function(req, res) {
		console.log('******************GET REQUEST');
		
		if(req.params.id) { //Single User
			usersService.getUser(req.params.id, models)
			.then(function(userData){
				console.log('route user data ' + userData)
				res.send(userData);
			})
			.catch(function(error) {
				res.status(403).send(error);
				res.end();
			});
		} else { //User List
			usersService.get(req, models)
			.then(function(userData){
				console.log('route user data ' + userData)
				res.send(userData);
			})
			.catch(function(error) {
				res.status(403).send(error);
				res.end();
			});
		}
		
		
	});
	app.post('/api/users/:id?', auth.requiresApiLogin, function(req, res) {

		if (req.params.id) { //Update
			usersService.update(req, models)
			.then(function(userid){
				res.send({success: true, userId: userid});
			})
			.catch(function(error) {
				res.status(403).send(error);
				res.end();
			});
		} else { //Create
			usersService.create(req, models)
			.then(function(userid){
				res.send({success: true, userId: userid});
			})
			.catch(function(error) {
				res.status(403).send(error);
				res.end();
			});
		}
	});
	app.delete('/api/users/:id', auth.requiresApiLogin, function(req, res) {
		console.log('DELETE-------------')
		usersService.delete(req.params.id, models)
		.then(function(userid){
			res.send({success: true});
		})
		.catch(function(error) {
			res.status(403).send(error);
			res.end();
		});
	});
	/*
	* Groups
	*/
	/*
	* Departments
	*/

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