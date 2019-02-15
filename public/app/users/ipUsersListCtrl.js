angular.module('app').controller('ipUsersListCtrl', function($scope, ipIdentity, ipUsersCrud, ipNotifier, $location, $rootScope) {
	$scope.identity = ipIdentity;
	$scope.user = ipIdentity.currentUser;
	var formatedUsers;
	ipUsersCrud.get({role: 'ALL'}).$promise.then(function(users) {
		formatedUsers = [];
		users.forEach(function(user){
			formatedUsers.push({
				"id": user.id,
				"Name": user.firstname + ' ' + ((user.lastname)?user.lastname:''),
				"Email": user.email,
				"Role": user.Roles[0].role
			});
		
		});

		$scope.initSlider();
	});
	
	$scope.initSlider = function () {
		$(function () {
		// wait till load event fires so all resources are available
		  $("#user-grid").jsGrid({
		        width: "100%",
		        height: "415px",
		 
		        inserting: false,
		        filtering: false,
		        editing: true,
		        sorting: true,
		        paging: true,

		        deleteConfirm: "Do you really want to delete the user?",
		        pageSize: 8,
        		pageButtonCount: 5,
		 
		        data: formatedUsers,
		 
		        fields: [
		            { name: "Name", type: "text", width: "25%"},
		            { name: "Email", type: "text", width: "25%"},
		            { name: "Role", type: "text", width: "25%"},
		            { type: "control"}
		        ],
		        onItemDeleting: function(args) {
			        // cancel deletion of the item with 'protected' fields
			        args.cancel = true;
			        ipUsersCrud.delete(args.item.id).$promise.then(
			        	function(response) {
				        	args.row.remove();
				        	ipNotifier.success('User successfully deleted');
			        	},
			        	function(response) {
				        	ipNotifier.error('Error deleting user');
			        	}
			        );
			    },
			    onItemEditing: function(args) {
			        // cancel editing of the row of item with field 'ID' = 0
			        $location.path('/users/edit/'+args.item.id);
			        $rootScope.$apply()
			        args.cancel = true;
			    }
		    });
		});
	};

    
});