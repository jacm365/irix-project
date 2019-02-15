angular.module('app').factory('ipIdentity', function($window, ipRoleCodes) {
	var currentUser;
	if(!($window.bootstrappedUserObject == null)) {
		currentUser = $window.bootstrappedUserObject;
	}
	return {
		currentUser: currentUser,
		isAuthenticated: function() {
			return !(this.currentUser == null);
		},
		isAdmin: function() {
			if(!this.isAuthenticated()) return false;
			var isAdmin = this.currentUser.roles.find(function(element) {
			  return element.role == ipRoleCodes.ADMIN;
			});
			
			return (!(isAdmin==null));
		},
		isCompany: function() {
			if(!this.isAuthenticated()) return false;
			var isCompany = this.currentUser.roles.find(function(element) {
			  return element.role == ipRoleCodes.CMPNY;
			});
			
			return (!(isCompany==null));
		}
	}
});