angular.module('app').controller('ipUsersFormCtrl', function($scope, $routeParams, ipIdentity, ipUsersCrud, ipRoleCodes, ipNotifier) {
	$scope.identity = ipIdentity;
	$scope.user = ipIdentity.currentUser;
	$scope.requiredPass = true;
	$scope.userId = undefined;
	$scope.name = undefined;
	$scope.companies = undefined;
	$scope.active = true;
	$scope.roleCodes = ipRoleCodes;
	
	if(ipIdentity.isAdmin()) {
		ipUsersCrud.get({role: ipRoleCodes.CMPNY}).$promise.then(function(companies) {
			$scope.companies = companies;
		});
	}
	if($routeParams.userId) {
		$scope.userId = $routeParams.userId;
		$scope.requiredPass = false;
		ipUsersCrud.getUser($scope.userId).$promise.then(function(selectedUser) {
			//set view
			$scope.firstname = selectedUser.firstname;
			$scope.lastname = selectedUser.lastname;
			$scope.username = selectedUser.username;
			$scope.email = selectedUser.email;
			$scope.active = selectedUser.active;
			$scope.age = selectedUser.age;
			$scope.gender = selectedUser.gender;
			$scope.role = String(selectedUser.Roles[0].roleid);
			if(selectedUser.Roles[0].code == ipRoleCodes.TRNEE || selectedUser.Roles[0].code == ipRoleCodes.TRANR ) {
				$scope.company = String(selectedUser.companyId);
			}
			$scope.name = selectedUser.firstname + ' ' + ((selectedUser.lastname!=null)?selectedUser.lastname:'');
		});
	}

	$scope.save = function(userForm) {
		if(userForm.$valid) {
			var newUserData = {
				id: $scope.userId,
				firstname: $scope.firstname,
				lastname: $scope.lastname,
				email: $scope.email,
				username: $scope.username,
				password: $scope.password,
				companyId: $scope.company,
				role: $scope.role,
				active: $scope.active,
				age: $scope.age,
				gender: $scope.gender
			}
			console.log(newUserData);
			console.log('save')
			
			ipUsersCrud.save(newUserData).$promise.then(
				function(res) {
					var action = '';
					if($routeParams.userId) {
						action = 'updated';
					} else {
						action = 'created';
					}
					ipNotifier.success('User '+action+'.'); 
					console.log(res.userId); $scope.clearForm();
				},
				function(error) { 
					var action = '';
					if($routeParams.userId) {
						action = 'updating';
					} else {
						action = 'creating';
					}
					ipNotifier.error('There was an error '+action+' the user.'); 
					console.log(error); 
				}
			);
		}
	}
	
	$scope.clearForm = function() {
		$scope.firstname = undefined,
		$scope.lastname = undefined,
		$scope.email = undefined,
		$scope.username = undefined,
		$scope.password = undefined,
		$scope.confirmPassword = undefined,
		$scope.companyId = undefined,
		$scope.role = undefined,
		$scope.age = undefined,
		$scope.gender = undefined
	}

});