angular.module('enertalkHomeUSA.controllers')

	.controller('UsageTrendsCtrl', function($scope, UsageTrendsModel, User, $timeout) {

		$scope.tabs = [{
			label: 'day',
			dataList: [],
			plan: User.dailyPlan / 24,
			model: UsageTrendsModel.getDayData
		},{
			label: 'week',
			dataList: [],
			plan: User.dailyPlan,
			model: UsageTrendsModel.getWeekData
		},{
			label: 'month',
			dataList: [],
			plan: User.dailyPlan,
			model: UsageTrendsModel.getMonthData
		},{
			label: 'year',
			dataList: [],
			plan: User.profile.maxLimitUsage,
			model: UsageTrendsModel.getYearData
		}];

		console.log($scope.tabs);

		$scope.currentTab = $scope.tabs[0];

		$scope.clickTab = function (index) {
			$scope.currentTab = $scope.tabs[index];
			if (!$scope.currentTab.dataList.length) {
				$scope.currentTab.model()
				.then(function (response) {
					$scope.currentTab.dataList = response;
					drawChart();
				})
			} else {
				drawChart();
			}
		};

		function init () {
			UsageTrendsModel.getDayData()
			.then(function (response) {
				$scope.currentTab.dataList = response;
				console.log($scope.currentTab.dataList);
				drawChart();
			});
		}

		function drawChart () {
			var barOptions = {
				chart: {
		            type: 'column',
		            renderTo: 'chart'
		        },
		        title: {
		            text: ''
		        },
		        
		        xAxis: {
		            title: {
		                text: null
		            },
		            type: 'datetime',
		            labels: {
		            		enabled: false
		            },
		            lineWidth: 0,
		            tickWidth: 0
		        },
		        yAxis: {
		            min: 0,
		            title: {
		                text: ''
		            },
		            labels: {
		            	enabled: false
		            },
		            gridLineWidth: 0,
		            plotLines: [{
	                    value: $scope.currentTab.plan,
	                    color: '#999999',
	                    width: 2,
	                    label: {
	                    	enabled: false
	                        // text: 'daily plan'
	                    }
                	}]
		        },
		        tooltip: {
		       			enabled: false
		        },
		        plotOptions: {
		            bar: {
		                dataLabels: {
		                    enabled: false
		                }
		            }
		        },
		        legend: {
		            enabled: false
		        },
		        credits: {
		            enabled: false
		        },
		        series: [{
		        	name: '',
		        	data: $scope.currentTab.dataList,
		        	color: '#2D71E7'
		        }]
			};

			$scope.chart = new Highcharts.chart(barOptions);			
		}

		$scope.label = {
			getDayLabel: function (timestamp) {
				var date = new Date(timestamp),
					dayLabel;
				if ($scope.currentTab.label === 'day') {
					dayLabel = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getHours();
				} else if ($scope.currentTab.label === 'year') {
					dayLabel = date.getFullYear() + '/' + (date.getMonth() + 1);
				} else {
					dayLabel = (date.getMonth() + 1) + '/' + date.getDate();
				}
				return dayLabel;
			},
			getkWhLabel: function (usage) {
				return (usage / 1000000).toFixed(2);
			},
			getPlanLabel: function (usage) {
				var diff = (((usage - $scope.currentTab.plan) / $scope.currentTab.plan) * 100).toFixed(1);

				if (diff >= 0) {
					return '+' + diff;
				} else {
					return '-' + Math.abs(diff);
				}
			}
		}
		init ();
	});