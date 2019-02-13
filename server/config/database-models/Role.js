

module.exports = function (sequelize, connection) {
	return connection.define('Roles', {
		id: {
			type: sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
	    },
	    role: {
	    	type: sequelize.STRING,
	    	allowNull: false
	    },
	    code: {
	    	type: sequelize.STRING,
	    	allowNull: false
	    }
	}, {timestamps: false});
}