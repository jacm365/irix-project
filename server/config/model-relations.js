

module.exports = function(connection, sequelize, models) {
	//User-Role
	models.UserRoles = connection.define('User_Roles',
		{
			userId: {
		   		type: sequelize.INTEGER,
		    	references: {
			    	model: models.User,
			    	key: 'id',
			    	deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
		    	}
			},
			roleId: {
		   		type: sequelize.INTEGER,
		    	references: {
		    		model: models.Role,
		    		key: 'id',
		    		deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
		    	}
			}
		}, {timestamps: false}
	);

	models.User.belongsToMany(models.Role, { through: models.UserRoles, foreignKey: 'userId' })
	models.Role.belongsToMany(models.User, { through: models.UserRoles, foreignKey: 'roleId' })

	return models;
}