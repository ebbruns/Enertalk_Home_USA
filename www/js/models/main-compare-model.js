angular.module('enertalkHomeUSA.services')

	.service('CompareModel', function ($q, Api, User) {

	    this.getYearData = function () {
	        var deferred = $q.defer(),
			period = {
			    unit: 'monthly' 
			},
			now = new Date(),
			start = new Date(now.getFullYear()-1, now.getMonth(), 1); // month is zero indexed, so 0 -> January

	        period.start = start.getTime();
	        period.end = now.getTime();

	        Api.getPeriodicUsage(User.accesstoken, User.uuid, period)
			.then(function (response) {
			    if (response.status === 200) {
			        var dataList = refineData(response.data);
			        deferred.resolve(dataList);
			    } else {
			        deferred.reject('');
			    }
			})
			.catch(function (error) {
			    deferred.reject(error);
			});

	        return deferred.promise;
	    };

	    this.getCurrentData = function () {
	        var deferred = $q.defer(),
			period = {
			    unit: '15min'
			},
			now = new Date(),
			start = new Date(now.getFullYear(), now.getMonth(), 1); // start at the beinning of the month

	        period.start = start.getTime();
	        period.end = now.getTime();

	        Api.getPeriodicUsage(User.accesstoken, User.uuid, period)
			.then(function (response) {
			    if (response.status === 200) {
			        var dataList = refineData(response.data);
			        deferred.resolve(dataList);
			    } else {
			        deferred.reject('');
			    }
			})
			.catch(function (error) {
			    deferred.reject(error);
			});

	        return deferred.promise;
	    };

	   this.getComparisonData = function () {
	        var deferred = $q.defer(),
            period = {
                unit: 'monthly' 
            },
            now = new Date(),
			start = new Date(now.getFullYear() - 1, now.getMonth(), 1); // month is zero indexed, so 0 -> January

	        period.start = start.getTime();
	        period.end = now.getTime();

	       Api.getUsageRanking(User.accesstoken, User.uuid, period, "current")
            .then(function (response) {
                if (response.status === 200) {
                    var dataList = response.data;
                    deferred.resolve(dataList);
                } else {
                    deferred.reject('');
                }
            })
			.catch(function (error) {
			    deferred.reject(error);
			});

	        return deferred.promise;
	   };

	   this.getComparisonDataPrior = function () {
	       var deferred = $q.defer(),
           period = {
               unit: 'monthly'
           },
           now = new Date(),
           start = new Date(now.getFullYear() - 1, now.getMonth(), 1); // month is zero indexed, so 0 -> January

	       period.start = start.getTime();
	       period.end = now.getTime();

	       Api.getUsageRanking(User.accesstoken, User.uuid, period, "last")
            .then(function (response) {
                if (response.status === 200) {
                    var dataList = response.data;
                    deferred.resolve(dataList);
                } else {
                    deferred.reject('');
                }
            })
			.catch(function (error) {
			    deferred.reject(error);
			});

	       return deferred.promise;
	   };



	    function refineData(dataList, type) {
	        var returnData = [],
				now = new Date(),
				tempDate;

	        angular.forEach(dataList, function (data) {
	            returnData.push({
	                x: data.timestamp,
	                y: data.unitPeriodUsage
	            });
	        });

	        if (returnData.length) {
	            tempDate = new Date(returnData[returnData.length - 1].x);
	            tempDate.setDate(tempDate.getDate() + 1);
	            while (tempDate.getDate() !== 1) {
	                returnData.push({
	                    x: tempDate.getTime(),
	                    y: 0
	                });
	                tempDate.setDate(tempDate.getDate() + 1);
	            }
	        }

	        return returnData;
	    }



	});