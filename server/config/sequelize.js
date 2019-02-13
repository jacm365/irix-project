var crypto = require('crypto');

module.exports = function(models, config, sequelize) {
	
	/*models.User.findOne({attributes: ['id']}).then(function (user) {
	    if(!user) {
	    	var salt = createSalt();
	    	var password = hashPassword(salt, '12345');
	    	User.create({ 
				firstname: 'Jaime',
				lastname: 'Clavijo',
				username: 'jaime.clavijo',
				hashedPassword: password,
				email: 'jaime.clavijo@irixapp.com',
				salt: salt,
				active: true
			}).then(function(user) {
				if (user) {
					console.log('user created succesfully')
				}
			});
	    }
	});*/
	
	/*models.Role.findOne({attributes: ['code']}).then(function (role) {
	    console.log(role.get('code'));
	});*/

	var connection = new sequelize(config.dbConnectionUri);

	connection.createSalt = function() {
		return crypto.randomBytes(128).toString('base64');
	}

	connection.hashPassword = function(salt, password) {
		var hmac = crypto.createHmac('sha256', salt);
		hmac.setEncoding('hex');
		hmac.write(password);
		hmac.end();
		return hmac.read();
	}

	return connection;
}

function createSalt() {
	return crypto.randomBytes(128).toString('base64');
}

function hashPassword(salt, password) {
	var hmac = crypto.createHmac('sha256', salt);
	hmac.setEncoding('hex');
	hmac.write(password);
	hmac.end();
	return hmac.read();
}