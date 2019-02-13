angular.module('app').controller('ipLoginCtrl', function($scope, $location, ipNotifier, ipAuth) {
	$scope.signin = function(user, password) {
		ipAuth.authenticateUser(user, password).then(function(success) {
			if(success){ 
				$location.url('/');
			} else {
				ipNotifier.error('User not found, please try again.');
			}
		});
	}
});