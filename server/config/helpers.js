var crypto = require('crypto');

exports.frontendUserData = function(userData) {
	return {
		id: userData.id,
		name: userData.firstname + " " + userData.lastname,
		companyId: userData.companyId,
		roles: userData.Roles
	}
};

exports.createSalt = function() {
	return crypto.randomBytes(128).toString('base64');
};

exports.hashPassword = function(salt, password) {
	var hmac = crypto.createHmac('sha256', salt);
	hmac.setEncoding('hex');
	hmac.write(password);
	hmac.end();
	return hmac.read();
};