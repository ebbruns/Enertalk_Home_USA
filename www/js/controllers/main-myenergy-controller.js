angular.module('enertalkHomeUSA.controllers')
  	
  	.controller('MainMyenergyCtrl', function($scope, $state, $timeout) {
  		
  		$scope.init = function (){
  			var target = document.getElementById('myenergy');
  			$scope.myenergyItems = [{
    			label: 'usage trends',
    			type: 'co2'
    		},{
    			label: 'energy calendar',
    			type: 'tree'
    		},{
    			label: 'toSeeScrollable',
    			type: 'tree'
    		}];

    		$timeout(function () {
	    		$scope.drawChart();
	    	}, 300);
  		};

  		$scope.drawChart = function () {
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
            		data: [10.34],
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
		                backgroundColor: '#FFFFFF',
		                innerRadius: '85%',
		                outerRadius: '100%',
		                shape: 'arc'
		            }
		        },

		        tooltip: {
		            enabled: false
		        },

		        yAxis: {
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
				case 'co2':
					$state.go('main.usage-trends');
  					break;
				case 'tree':
					$state.go('main.energy-calendar');
					break;
  			}
  		};
  		$scope.init();

  	});