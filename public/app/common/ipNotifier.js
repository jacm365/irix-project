angular.module('app').value('ipToastr', toastr);

angular.module('app').factory('ipNotifier', function(ipToastr) {
	return {
		success: function(message) {
			ipToastr.success(message);
		},
		error: function(message) {
			ipToastr.error(message);
		}
	}
});