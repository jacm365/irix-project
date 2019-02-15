var helpers = require('./../helpers');

module.exports = function (sequelize, connection) {
	var User = connection.define('Users', {
		id: {
			type: sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
	    },
	    firstname: {
	    	type: sequelize.STRING,
	    	allowNull: false
	    },
	    lastname: {
	    	type: sequelize.STRING,
	    	allowNull: true
	    },
	    username: {
	    	type: sequelize.STRING,
	    	allowNull: true,
	    	unique: true
	    },
	    hashedPassword: {
	    	type: sequelize.STRING,
	    	allowNull: false
	    },
	    email: {
	    	type: sequelize.STRING,
	    	allowNull: false,
	    	unique: true
	    },
	    companyId: {
	    	type: sequelize.INTEGER,
	    	allowNull: true
	    },
	    active: {
	    	type: sequelize.STRING,
	    	allowNull: false
	    },
	    age: {
	    	type: sequelize.SMALLINT,
	    	allowNull: true
	    },
	    gender: {
	    	type: sequelize.STRING,
	    	allowNull: true
	    },
	    salt: {
	    	type: sequelize.STRING,
	    	allowNull: false
	    }
	});
	User.authenticate = function(password, hashedPassword, salt) {
		return helpers.hashPassword(salt, password) === hashedPassword;
	}

	return User;
	
}