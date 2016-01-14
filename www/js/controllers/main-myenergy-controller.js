angular.module('enertalkHomeUSA.controllers')
  	
  	.controller('MainMyenergyCtrl', function($scope, $state, $timeout, MyenergyModel) {
  		
  		$scope.init = function (){
  			var target = document.getElementById('myenergy');
  			$scope.myenergyItems = [{
    			label: 'USAGE TRENDS',
    			type: 'usage-trends'
    		},{
    			label: 'ENERGY CALENDAR',
    			type: 'energy-calendar'
    		},{
    			label: 'REAL TIME USAGE',
    			type: 'realtime-usage'
    		},{
    			label: 'STANDBY POWER',
    			type: 'standby-power'
    		}];

    		MyenergyModel.getModel().then(function (response) {
    			$scope.data = response;
    			$scope.drawChart(parseFloat($scope.data.todayUsage));
    		});
    		// $timeout(function () {
	    	// 	$scope.drawChart();
	    	// }, 300);
  		};

  		$scope.drawChart = function (todayUsage) {
  			var target = document.getElementById('kwh-chart'),
	  			width = target.style.width,
	  			height = target.style.height,
	  			gaugeOptions = {

			        chart: {
			        	renderTo: 'kwh-chart',
			            type: 'solidgauge'
			        },

			        series: [{
	            		name: '',
	            		data: [todayUsage],
	            		dataLabels: {
		            		format: '<div style="text-align: center; font-size: 28px;">{y}</div>' + 
		            		'<div style="text-align: center; font-size: 16px;">kWh</div>'
		            	}
	        		}],

			        title: null,

			        pane: {
			            center: ['50%', '65%'],
			            size: '100%',
			            startAngle: -135,
			            endAngle: 135,
			            background: {
			                backgroundColor: '#EEE',
			                innerRadius: '85%',
			                outerRadius: '100%',
			                shape: 'arc',
			                borderWidth: 0
			            }
			        },

			        tooltip: {
			            enabled: false
			        },

			        yAxis: {
			        	min: 0,
			        	max: 10,
			        	stops: [
			                [0.0, '#00cc00'], // green
			                [1.0, '#00cc00'], // yellow
			            ],
			            lineWidth: 0,
			            minorTickInterval: null,
			            tickPixelInterval: 400,
			            tickWidth: 0,
			            title: {
			                y: -70
			            },
			            labels: {
			            	enabled: false
			            }
			        },

			        plotOptions: {
			            solidgauge: {
			            	innerRadius: '85%',
			                dataLabels: {
			                    y: - 20,
			                    borderWidth: 0,
			                    useHTML: true
			                }
			            }
			        },

			        credits: {
			        	enabled: false
			        }
			    };

		    $scope.chart = new Highcharts.chart(gaugeOptions);
  		};

  		$scope.goToDetailView = function (type) {
  			switch (type) {
  				case 'kwh':
  					$state.go('main.kwh-usage');
  					break;
				case 'usage-trends':
					$state.go('main.usage-trends');
  					break;
				case 'energy-calendar':
					$state.go('main.energy-calendar');
					break;
  			}
  		};
  		$scope.init();

  	});