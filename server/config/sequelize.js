

module.exports = function(config, sequelize) {

	return new sequelize(config.dbConnectionUri);
}