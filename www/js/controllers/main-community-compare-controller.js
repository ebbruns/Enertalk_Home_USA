angular.module('enertalkHomeUSA.controllers')

.controller('CommCompareCtrl', function ($scope, $state, CompareModel, $rootScope) {

    function init() {
        CompareModel.getYearData()
			.then(function (response) {
			    //$scope.detailDataList = response;
			    $scope.dataList = response;
			    CompareModel.getCurrentData()
                    .then(function (response) {
                        $scope.current = 0;
                        console.log(response);
                        for (i = 0; i < response.length; i++) {
                            $scope.current += response[i].y;
                        }

                    
		/*	    CompareModel.getComparisonData()
                    .then(function (comparison) {
                        $scope.comparison = comparison; */
			    window.setTimeout(drawChart, 100); //gives ng-repeat time to render divs before trying to put charts there, not the best way to do it, but it's very hard to check ng-repeat termination without jquery			
			    window.setTimeout(drawCurrentChart, 10);
                    })
			})
    }

        $scope.edit = function () {
            if (typeof $rootScope.home == 'undefined') {
                $rootScope.home = {};
            }
            $state.go('main.compare-edit')
        }

        function drawChart() {
            var months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            n = $scope.dataList.length;
            i = 0;
            console.log($scope.dataList);

            while (i < n) {
                var chartMonth = new Date($scope.dataList[n - 1 - i].x);
                myChart = {
                    chart: {
                        type: 'bar',
                        renderTo: 'chart' + i
                    },
                    title: {
                        text: months[chartMonth.getMonth()]
                    },
                    yAxis: {
                        categories: ['Kilowatt Hours']
                    },
                    xAxis: {
                        title: {
                            text: ''
                        }
                    },
                    series: [{
                        name: 'Your Usage',
                        data: [$scope.dataList[n - 1 - i].y / 1000]
                    }, {
                        name: 'Similar Homes',
                        data: [($scope.dataList[n - 1 - i].y / 1000)]
                    }]
                };


                $scope.chart = new Highcharts.chart(myChart);
                i++;
            }
        }

        function drawCurrentChart() {
            var months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            console.log($scope.current);

                var currentDate = new Date();
                currentChart = {
                    chart: {
                        type: 'bar',
                        renderTo: 'currentChart'
                    },
                    title: {
                        text: months[currentDate.getMonth()]
                    },
                    yAxis: {
                        categories: ['Kilowatt Hours']
                    },
                    xAxis: {
                        title: {
                            text: ''
                        }
                    },
                    series: [{
                        name: 'Your Usage',
                        data: [$scope.current / 1000]
                    }, {
                        name: 'Similar Homes',
                        data: [($scope.current / 1000)]
                    }]
                };


                $scope.chart = new Highcharts.chart(currentChart);
            }
        

        $scope.removeZero = function (item) {
            return item.y > 0;
        };
        init();

    });