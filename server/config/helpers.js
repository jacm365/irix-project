

exports.frontendUserData = function(userData) {
	return {
		id: userData.id,
		name: userData.firstname + " " + userData.lastname,
		companyId: userData.companyId,
		roles: userData.Roles
	}
};
