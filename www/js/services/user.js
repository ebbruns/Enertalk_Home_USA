angular.module('enertalkHomeUSA.services')
	
	.service('User', function (Oauth, Api, $log, $q) {
		
		var _this = this;

		this.init = function () {
			_this.accesstoken = undefined;
			_this.refreshtoken = undefined;
			_this.uuid = undefined;
			_this.profile = {};
			_this.dailyPlan = 0;
		};

		this.login = function (credentials, next) {
			Oauth.getAccesstoken(credentials)

			.then(function (response) {
				if (response.status === 200 && response.data.access_token) {
					$log.info('accesstoken is ' + response.data.access_token);
					$log.info('refreshtoken is ' + response.data.refresh_token);
					_this.accesstoken = response.data.access_token;
					_this.refreshtoken = response.data.refresh_token;
					return Oauth.getUUID(_this.accesstoken);
				} else {
					return $q.reject();
				}
			})

			.then(function (response) {
				if (response.status === 200 && response.data.uuid) {
					$log.info('uuid is ' + response.data.uuid);
					_this.uuid = response.data.uuid;
					return Api.getProfile(_this.accesstoken);	
				} else {
					return $q.reject();
				}
			})

			.then(function (response) {
				if (response.status === 200 && response.data) {
					_this.profile = response.data;
					_this.setDailyPlan(_this.profile.maxLimitUsage);
					console.log(_this.profile);
					console.log(_this.dailyPlan);
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

		this.setDailyPlan = function (monthlyPlan) {
			var now = new Date(),
				start = new Date(now.getFullYear(), now.getMonth(), 1),
				end = new Date(now.getFullYear(), now.getMonth() + 1, 0),
				lengthOfThisMonth = end.getDate() - start.getDate() + 1;

			_this.dailyPlan = monthlyPlan / lengthOfThisMonth;
		};

		_this.init();
	});