angular.module('enertalkHomeUSA.services')

	.service('EnergyCalendarModel', function ($q, Api, User) {

		this.getModel = function () {
			var deferred = $q.defer(),
				now = new Date(),
				period = {
					unit: 'daily'
				},
				start = new Date(now.getFullYear(), now.getMonth(), 1);

			period.start = start.getTime();
			period.end = now.getTime();

			Api.getPeriodicUsage(User.accesstoken, User.uuid, period)
			.then(function (response) {
				if (response.status == 200) {
					deferred.resolve(response);
				} else {
					deferred.reject('status not 200');
				}
			})
			.catch(function (error) {
				deferred.reject(error);
			});

			return deferred.promise;
		};

	});