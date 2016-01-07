angular.module('enertalkHomeUSA.services')

	.service('Api', function (APIURL, $http, Util) {
		
		this.getProfile = function (accesstoken) {
			return $http({
				method: 'GET',
				url: APIURL.profileUrl,
				headers: {
					'Authorization': Util.encodeAuthHeader.bearer(accesstoken)
				},
				params: {
					app_version: '0.0.10'
				}
			});
		};
		
	});