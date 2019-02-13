angular.module('app').factory('ipIdentity', function($window) {
	var currentUser;
	if(!($window.bootstrappedUserObject == null)) {
		currentUser = $window.bootstrappedUserObject;
	}
	return {
		currentUser: currentUser,
		isAuthenticated: function() {
			return !(this.currentUser == null);
		}
	}
});