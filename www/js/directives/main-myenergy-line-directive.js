angular.module('enertalkHomeUSA')
  	.directive('myenergyLine', function () {
    	return {
    		templateUrl: 'templates/directive/main-myenergy-line.html',
	    	restrict: 'EA',
	      	scope: {
	      		label: '@',
	      		type: '@'
	      	},
      		link: function (scope, element) {
        		
      			scope.init = function () {
      				scope.height = scope.height + 'px';
      				if (scope.type === 'co2') {
      					scope.isUsageTrends = true;
      				} else {
      					scope.isUsageTrends = false;
      				}
      			};

      			scope.init();
      		}
    	};
  	});
