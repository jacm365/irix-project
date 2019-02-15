angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider) {
	var routeRoleChecks = {
		user: { //Just checks if is a user with a session
			auth: function(ipIdentity, $q) {
				if(ipIdentity.isAuthenticated()) {
					return true;
				} else {
					return $q.reject('not authorized')
				}
			}
		},
		admin: { //Companies route should be only available for Admins
			auth: function(ipIdentity, $q) {
				if(ipIdentity.isAdmin()) {
					return true;
				} else {
					return $q.reject('not admin')
				}
			}
		},
		adminOrCompany: {
			auth: function(ipIdentity, $q) { //Users route can be accessed by both
				if(ipIdentity.isAdmin() || ipIdentity.isCompany()) {
					return true;
				} else {
					return $q.reject('not admin or company')
				}
			}
		}
	}
	
	$locationProvider.html5Mode(true);
	$routeProvider
		.when('/login', {templateUrl: '/partials/account/login'})
		.when('/', {templateUrl: '/partials/main/main', controller: 'ipMainCtrl', resolve: routeRoleChecks.user})
		.when('/users', {templateUrl: '/partials/users/usersList', controller: 'ipUsersListCtrl', resolve: routeRoleChecks.adminOrCompany})
		.when('/users/edit/:userId?', {templateUrl: '/partials/users/usersForm', controller: 'ipUsersFormCtrl', resolve: routeRoleChecks.adminOrCompany})
});

angular.module('app').run(function($rootScope, $location) {
	$rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
		switch(rejection) {
			case 'not authorized':
				$location.path('/login');
				break;
			case 'not admin':
				$location.path('/');
				break;
			case 'not admin or company':
				$location.path('/');
				break;
		}
	});
});