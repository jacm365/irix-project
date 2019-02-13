angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider){
	$locationProvider.html5Mode(true);
	$routeProvider
		.when('/login', {templateUrl: '/partials/account/login'})
		.when('/', {templateUrl: '/partials/main/main', controller: 'ipMainCtrl'})
		.when('/users', {templateUrl: '/partials/users/usersList', controller: 'ipUsersListCtrl'})
});