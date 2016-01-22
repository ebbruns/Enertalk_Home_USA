angular.module('enertalkHomeUSA.controllers')

.controller('CommCompareCtrl', function ($scope, $state, CompareModel, $rootScope) {

    function init() {
        $scope.done = false;
        CompareModel.getYearData()
			.then(function (response) {
			    //$scope.detailDataList = response;
			    $scope.dataList = response;
			    window.setTimeout(drawChart, 100); //gives ng-repeat time to render divs before trying to put charts there
			})
    }

    $scope.edit = function () {
        if (typeof $rootScope.home == 'undefined') {
            $rootScope.home = {};
        }
        $state.go('main.compare-edit')
    }

    $scope.$on('$viewContentLoaded', function () {
        $scope.done = true;
    });

    function checkDone(index) {
        $scope.done = true;
    }

    function drawChart() {
        var months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        n = $scope.dataList.length;
        i = 0;
        console.log($scope.dataList);
 
        while (i < n) {
            var chartMonth = new Date($scope.dataList[i].x);
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
                data: [$scope.dataList[i].y/1000]
            }, {
                name: 'Similar Homes',
                data: [$scope.dataList[i].y/1000]
            }]
        };

        



          /*  barOptions = {
                chart: {
                    type: 'column',
                    renderTo: 'chart' + i
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
                        value: $scope.dataList[i].x,
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
                    data: [$scope.dataList[i].y, 1000],
                    color: '#2D71E7'
                }]
            */

            $scope.chart = new Highcharts.chart(myChart);  
            i++;
        }
    }

    $scope.removeZero = function (item) {
        return item.y > 0;
    };
    init();

});
