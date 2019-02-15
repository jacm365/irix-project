angular.module('app').factory('ipUsersCrud', function($resource) {
	
	var userResource = $resource('/api/users/:id', { id: '@id' });
	
	return {
		save: function(newUserData) {
			return userResource.save(newUserData);
		},
		get: function(filters)  {
			return userResource.query(filters);
		},
		getUser: function(userId)  {
			return userResource.get({id: userId});
		},
		delete: function(userId) {
			return userResource.delete({id: userId});
		}
	}
});