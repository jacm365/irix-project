angular.module('app').factory('ipAuth', function($http, $window, ipIdentity, $q) {
	return {
		authenticateUser: function(user, password) {
			var dfd = $q.defer();
			$http.post('/login', {user:user, password:password})
			.then(function(response) {
				if(response.data.success) {
					ipIdentity.currentUser = response.data.user;
					dfd.resolve(true);
				} else {
					dfd.resolve(false);
				}
			});
			return dfd.promise;
		},
		logoutUser: function() {
			var dfd = $q.defer();
			$http.post('/logout', {logout:true}).then(function() {
				$window.bootstrappedUserObject = undefined;
				ipIdentity.currentUser = undefined;
				dfd.resolve();
			});
			return dfd.promise;
		}
	}
});