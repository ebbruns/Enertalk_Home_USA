angular.module('enertalkHomeUSA.services')
	
	.service('User', function (Oauth, Api, $log, $q) {
		
		this.init = function () {
			this.accesstoken = undefined;
			this.refreshtoken = undefined;
			this.uuid = undefined;
			this.profile = {};
			this.deviceStatus = 'NOT_REGISTERED';
		};

		this.login = function (credentials, next) {
			Oauth.getAccesstoken(credentials)

			.then(function (response) {
				$log.info('accesstoken is ' + response.access_token);
				$log.info('refreshtoken is ' + response.refresh_token);

				if (response.access_token) {
					this.accesstoken = response.access_token;
					this.refreshtoken = response.refresh_token;
					return Oauth.getUUID(this.accesstoken);
				} else {
					return $q.reject();
				}
			})

			.then(function (response) {
				if (response.uuid) {
					this.uuid = response.uuid;
					return Api.getProfile();
				} else {
					return $q.reject();
				}
			})

			.then(function (profile) {
				this.profile = profile;
				next(null, 'success');
			})

			.catch(function (error) {
				$log.info(error);
				next(error);
			});
		};

		this.logout = function () {

		};

	});