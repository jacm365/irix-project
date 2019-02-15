angular.module('app').controller('ipHeaderCtrl', function($scope, ipIdentity, $location, ipAuth) {
	$scope.identity = ipIdentity;
	$scope.user = ipIdentity.currentUser;
	$scope.signout = function() {
		ipAuth.logoutUser().then(function() {
			$location.url('/login')
		});
	}
});