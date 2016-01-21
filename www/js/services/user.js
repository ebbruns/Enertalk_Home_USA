angular.module('enertalkHomeUSA.services')
	
	.service('User', function (Oauth, Api, $log, $q, Util) {
		
		var _this = this;

		this.init = function () {
			_this.accesstoken = undefined;
			_this.refreshtoken = undefined;
			_this.uuid = undefined;
			_this.profile = {};
			_this.dailyPlan = 0;
			_this.hourlyPlan = 0;
			_this.monthData = undefined;

			// var savedUser = Util.localStorage.getObject('User'),
			// 	savedProfile = Util.localStorage.getObject('proflie');

			// if (savedUser) {
			// 	_this.accesstoken = savedUser.accesstoken;
			// 	_this.refreshtoken = savedUser.refreshtoken;
			// 	_this.uuid = savedUser.uuid;
			// 	_this.dailyPlan = savedUser.dailyPlan;
			// 	_this.hourlyPlan = savedUser.monthlyPlan;
			// 	_this.monthData = savedUser.monthData;
			// }
			// if (savedProfile) {
			// 	_this.proflie = savedProfile;
			// }
		};

		this.login = function (credentials, next) {
			Oauth.getAccesstoken(credentials)

			.then(function (response) {
				if (response.status === 200 && response.data.access_token) {
					_this.accesstoken = response.data.access_token;
					_this.refreshtoken = response.data.refresh_token;
					return Oauth.getUUID(_this.accesstoken);
				} else {
					return $q.reject();
				}
			})

			.then(function (response) {
				if (response.status === 200 && response.data.uuid) {
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
					_this.hourlyPlan = _this.dailyPlan / 24;
					next(null, 'success');
					_this.getMonthData();
					
					// Util.localStorage.setObject('User', {
					// 	accesstoken: _this.accesstoken,
					// 	refreshtoken: _this.refreshtoken,
					// 	uuid: _this.uuid,
					// 	profile: _this.proflie,
					// 	dailyPlan: _this.dailyPlan,
					// 	hourlyPlan: _this.hourlyPlan,
					// 	monthData: _this.monthData
					// });
					// Util.localStorage.setObject('profile', _this.profile);

				} else {
					return $q.reject();
				}
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

		this.getMonthData = function () {
			var period = {},
				now = new Date(),
				start = new Date(now.getFullYear(), now.getMonth(), 1);

				period.unit = 'hourly';
				period.start = start.getTime();
				period.end = now.getTime();

				Api.getPeriodicUsage(_this.accesstoken, _this.uuid, period)
				.then(function (response) {
					if (response.status === 200) {
						_this.monthData = refineMonthData(response.data);
					}
				});
		};

		function refineMonthData (dataList) {
			var refineData = [],
				refineObject = {
					timestamp: 0,
					unitPeriodUsage: 0,
					activeTime: ''
				},
				currentDate,
				previousDate,
				timeData = [0, 0, 0, 0];

			angular.forEach(dataList, function (data, index) {
				if (index === 0) {
					refineObject.timestamp = data.timestamp;
					refineObject.unitPeriodUsage = data.unitPeriodUsage;
					currentDate = new Date(data.timestamp);
					previousDate = new Date(data.timestamp);
					timeData[defineActiveTime(data.timestamp)] += data.unitPeriodUsage;
				} else if (index === dataList.length - 1) {
					refineObject.activeTime = getActiveTime(timeData);
					refineData.push(refineObject);
				}
				else {
					currentDate = new Date(data.timestamp);
					if (currentDate.getDate() !== previousDate.getDate()) {
						refineObject.activeTime = getActiveTime(timeData);
						refineData.push(refineObject);
						refineObject = {
							timestamp: 0,
							unitPeriodUsage: 0,
							activeTime: ''
						};
						timeData = [0, 0, 0, 0];
						refineObject.timestamp = data.timestamp;
					} else {
						refineObject.unitPeriodUsage += data.unitPeriodUsage;
						timeData[defineActiveTime(data.timestamp)] += data.unitPeriodUsage;
					}
					previousDate = new Date(data.timestamp);
				}
			});

			function defineActiveTime (timestamp) {
				var date = new Date(timestamp),
					hour = date.getHours(),
					index = 0;

				if (hour >= 0 && hour < 6) {
					index = 0;
					// night
				} else if (hour >= 6 && hour < 12) {
					index = 1;
					// morning
				} else if (hour >= 12 && hour < 18) {
					index = 2;
					// afternoon
				} else if (hour >= 18 && hour < 24) {
					index = 3;
					//evening
				}
				return index;
			}

			function getActiveTime (dataFromTime) {
				var max = 0,
					maxIndex = 0;
				angular.forEach(dataFromTime, function (data, index) {
					if (data > max) {
						max = data;
						maxIndex = index;
					}
				});

				if (maxIndex === 0) {
					return 'night';
				} else if (maxIndex === 1) {
					return 'morning';
				} else if (maxIndex === 2) {
					return 'afternoon';
				} else if (maxIndex === 3) {
					return 'evening';
				}
			}

			return refineData;
		}

		_this.init();
	});