angular.module('app').factory('ipIdentity', function($window) {
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
			var isAdmin = this.currentUser.roles.find(function(element) {
			  return element.role == "ADMIN";
			});
			
			return (!(isAdmin==null));
		},
		isCompany: function() {
			var isCompany = this.currentUser.roles.find(function(element) {
			  return element.role == "CMPNY";
			});
			
			return (!(isCompany==null));
		}
	}
});