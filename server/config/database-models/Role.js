

module.exports = function (sequelize, connection) {
	return connection.define('Roles', {}, {timestamps: false});
}