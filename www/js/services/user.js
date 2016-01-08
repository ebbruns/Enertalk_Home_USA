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
				if (response.status === 200 && response.data.access_token) {
					$log.info('accesstoken is ' + response.data.access_token);
					$log.info('refreshtoken is ' + response.data.refresh_token);
					this.accesstoken = response.data.access_token;
					this.refreshtoken = response.data.refresh_token;
					return Oauth.getUUID(this.accesstoken);
				} else {
					return $q.reject();
				}
			})

			.then(function (response) {
				if (response.status === 200 && response.data.uuid) {
					$log.info('uuid is ' + response.data.uuid);
					this.uuid = response.data.uuid;
					return Api.getProfile(this.accesstoken);	
				} else {
					return $q.reject();
				}
			})

			.then(function (response) {
				if (response.status === 200 && response.data) {
					this.profile = response.data;
				} else {
					return $q.reject();
				}
				next(null, 'success');
			})

			.catch(function (error) {
				$log.info(error);
				next(error, 'error');
			});
		};

		this.logout = function () {

		};

	});