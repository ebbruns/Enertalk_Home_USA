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
		this.getPeriodicUsage = function (accesstoken, uuid, period) {
			return $http({
				method: 'GET',
				url: APIURL.periodicUsage(uuid),
				headers: {
					'Authorization': Util.encodeAuthHeader.bearer(accesstoken)
				},
				params: {
					period: period.unit,
					start: period.start,
					end: period.end
				}
			});
		};
		this.getUsageRanking = function (accesstoken, uuid, period, state) {
		    return $http({
		        method: 'GET',
		        url: APIURL.usageRanking(uuid),
		        headers: {
		            'Authorization': Util.encodeAuthHeader.bearer(accesstoken)
		        },
		        params: {
		            period: period.unit,
		            start: period.start,
		            end: period.end,
                    state: state
		        }
		    });
		};
		this.getMeteringUsage = function (accesstoken, uuid) {
			return $http({
				method: 'GET',
				url: APIURL.meteringUsage(uuid),
				headers: {
					'Authorization': Util.encodeAuthHeader.bearer(accesstoken)
				}
			});
		};
		this.getForecastUsage = function (accesstoken, uuid) {
			return $http({
				metjpd: 'GET',
				url: APIURL.forecastUsage(uuid),
				headers: {
					'Authorization': Util.encodeAuthHeader.bearer(accesstoken)
				}
			});
		};
	});