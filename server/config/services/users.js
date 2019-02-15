var helpers = require('./../helpers');
var auth = require('./../auth');


exports.getUser = function(userId, models) {
	var includeRole = [{
	    model: models.Role,
	    attributes: [['id', 'roleid'],['code', 'code'],['role', 'role']],
	    through:{
		    attributes: [] //Omits the linking table records
		}
	}];
	var response = new Promise(function(resolve, reject) {
		models.User.findOne({
			include: includeRole,
			where: {id: userId}
		}).then(function(user) {
			resolve(user);
		}).catch(function(err) {
			reject(err);
		});
	});

	return response;
};
exports.get = function(req, models) {
	
	var userData = req.body;
	var queryData = req.query;
	var currentUserData = req.user;
	var includeRole = [{
	    model: models.Role,
	    attributes: [['code', 'code'],['role', 'role']],
	    through:{
		    attributes: [] //Omits the linking table records
		}
	}];
	var response = new Promise(function(resolve, reject) {
		switch(queryData.role) {
			case 'ALL':
				if(auth.isAdmin(currentUserData)) {
					models.User.findAll({include: includeRole}).then(function(userData) {
						//res.send(userData);
						resolve(userData);
					});
				} else {
					var companyId;
					if(auth.isAdmin(currentUserData)) {
						companyId = currentUserData.id;
						models.User.findAll({
							include: includeRole,
							where: {
								companyId: companyId
							}
						}).then(function(userData) {
							//res.send(userData);
							resolve(userData);
						});
					} else {
						companyId = currentUserData.companyId;
						models.User.findAll({
							include: includeRole,
							where: {
								companyId: companyId,
								active: true
							}
						}).then(function(userData) {
							//res.send(userData);
							resolve(userData);
						});
					}
				}
				break;
			case 'CMPNY'://Companies
				if(auth.isAdmin(currentUserData)) {
					models.User.findAll({
						include: includeRole,
						where: {
							active: true,
							'$Roles.code$': queryData.role
						}
					}).then(function(userData) {
						//res.send(userData);
						resolve(userData);
					});
				} else {
					reject("Unauthorized");
				}
				break;
			case 'TRANR'://Trainers
				break;
			case 'TRNEE'://Trainees
				break;

		}
	});

	return response;
};

exports.create = function(req, models) {
	
	var userData = req.body;
	var salt = helpers.createSalt();
	var currentUserData = req.user;
	var password = helpers.hashPassword(salt, userData.password);
	var response = new Promise(function(resolve, reject) {
		
		if(!auth.isAdmin(currentUserData)) {
			if (userData.role == 1|| userData.role == 2) {
				reject("Unauthorized");
			}
		}
		models.User.create({
			firstname: userData.firstname,
			lastname: userData.lastname,
			username: userData.username,
			hashedPassword: password,
			email: userData.email,
			companyId: userData.companyId,
			active: userData.active,
			age: userData.age,
			gender: userData.gender,
			salt: salt
		}).then(function(user) {
			if (userData.role == 3) {
				models.UserRoles.bulkCreate([
					{
						userId: user.id,
						roleId: 3
					},
					{
						userId: user.id,
						roleId: 4
					}
				]).then(function(role){
					resolve(user.id);
				}).catch(function(error) {
					reject("Failed to create user: " + error);
				});
			} else {
				models.UserRoles.create({
					userId: user.id,
					roleId: userData.role
				}).then(function(role){
					resolve(user.id);
				}).catch(function(error) {
					reject("Failed to create user: " + error);
				});
			}
		}).catch(function(error) {
			reject("Failed to create user: " + error);
		});

	});

	return response;
};

exports.update = function(req, models) {
	console.log('------------USER SERVICE: UPDATE');
	var userData = req.body;
	var currentUserData = req.user;
	var updateObject = {
		firstname: userData.firstname,
		lastname: userData.lastname,
		username: userData.username,
		email: userData.email,
		companyId: userData.companyId,
		active: userData.active,
		age: userData.age,
		gender: userData.gender
	};
	if (userData.password) {
		var salt = helpers.createSalt();
		var password = helpers.hashPassword(salt, userData.password);
		updateObject.hashedPassword = password;
		updateObject.salt = salt;
	}
	var response = new Promise(function(resolve, reject) {
		
		if(!auth.isAdmin(currentUserData)) {
			if (userData.role == 1|| userData.role == 2) {
				reject("Unauthorized");
			}
		}
		models.User.update(updateObject, {where: {id: userData.id}}).then(function(user) {
			models.UserRoles.destroy({where: {userId: userData.id}})
			console.log('success updating user'+ user)
			if (userData.role == 3) {
				models.UserRoles.bulkCreate([
					{
						userId: userData.id,
						roleId: 3
					},
					{
						userId: userData.id,
						roleId: 4
					}
				]).then(function(role){
					resolve(userData.id);
				}).catch(function(error) {
					reject("Failed to create user: " + error);
				});
			} else {
				models.UserRoles.create({
					userId: userData.id,
					roleId: userData.role
				}).then(function(role){
					resolve(userData.id);
				}).catch(function(error) {
					reject("Failed to create user: " + error);
				});
			}
		}).catch(function(error) {
			console.log('error updating user '+ error)
			reject("Failed to create user: " + error);
		});

	});

	return response;
};

exports.delete = function(userid, models) {
	console.log('------------USER SERVICE: DELETE' + userid);

	var response = new Promise(function(resolve, reject) {
		console.log('PROMISE');
		models.User.destroy({where: {id: userid}})
		.then(function(res) {
			console.log('USER DESTROYED');
			models.UserRoles.destroy({where: {userId: userid}})
			.then(function(res) {
				console.log('USER ROLES DESTROYED');
				resolve(true);
			})
			.catch(function(res) {
				console.log('USER ROLES DESTROYED ERROR');
				reject('Error deleting user. ' + res);
			})
		})
		.catch(function(res){
			console.log('USER DESTROYED ERROR' + res);
			reject('Error deleting user. ' + res);
		});
	});

	return response;
};