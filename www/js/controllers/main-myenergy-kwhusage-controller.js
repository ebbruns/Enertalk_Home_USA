angular.module('enertalkHomeUSA.controllers')

	.controller('KwhUsageCtrl', function($scope) {

		function init () {
			var now = new Date(),
			year = now.getFullYear(),
			month = now.getMonth() + 1,
			date = now.getDate();
			$scope.now = month + '/' + date + '/' + year;
	
			// renderFirstChart();
			// renderSecondChart();
		}

		function renderFirstChart () {
			var target = document.getElementById('usage-percent-chart'),
			svg,
			offsetWidth,
			offsetHeight,
			trackLine,
			tintLine,
			lineFunction = d3.svg.line()
				.x(function (d) { return d.x; })
				.y(function (d) { return d.y; })
				.interpolate('linear');
			
			svg = d3.select(target)
				.append('svg')
				.attr({
					'width': '100%',
					'height': '100%'
				});

			offsetWidth = svg[0][0].offsetWidth;
			offsetHeight = svg[0][0].offsetHeight;

			trackLine = [{
				x: 10,
				y: offsetHeight / 2
			}, {
				x: offsetWidth - 10,
				y: offsetHeight / 2
			}];
			tintLine = [{
				x: 10,
				y: offsetHeight / 2
			}, {
				x: offsetWidth * 0.7 - 10,
				y: offsetHeight / 2
			}];

			svg.append('path')
				.attr({
					'd': lineFunction(trackLine),
					'stroke': '#878787',
					'stroke-width': 20,
					'stroke-linecap': 'round'
				});

			svg.append('path')
				.attr({
					'd': lineFunction(tintLine),
					'stroke': '#93E7CD',
					'stroke-width': 20,
					'stroke-linecap': 'round'
				})
		}
		function renderSecondChart () {
			var barOptions = {
				chart: {
		            type: 'column',
		            renderTo: 'sub-contents-chart'
		        },
		        title: {
		            text: ''
		        },
		        subtitle: {
		            text: ''
		        },
		        xAxis: {
		            type: 'category',
		            labels: {
		            	enabled: false
		            },
		        },
		        yAxis: {
		            min: 0,
		            labels: {
		            	enabled: false
		            },
		            title: {
		            	text: ''
		            }
		        },
		        legend: {
		            enabled: false
		        },
		        tooltip: {
		            pointFormat: ''
		        },
		        series: [{
		            name: 'Population',
		            data: [
		                ['Shanghai', 23.7],
		                ['Lagos', 16.1],
		                ['Instanbul', 14.2],
		                ['Karachi', 14.0],
		                ['Mumbai', 12.5],
		                ['Moscow', 12.1],
		                ['São Paulo', 11.8],
		                ['Beijing', 11.7],
		                ['Guangzhou', 11.1],
		                ['Delhi', 11.1]
		            ],
		            dataLabels: {
		                enabled: false
		            },
		            
		        }],
		        
		        credits: {
		        		enabled: false
		        }
			};

			$scope.chart = new Highcharts.chart(barOptions)
		}

		init();
	});