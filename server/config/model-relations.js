

module.exports = function(models) {
	//User-Role
	models.User.hasMany(models.Role, { as: 'roles' });
}