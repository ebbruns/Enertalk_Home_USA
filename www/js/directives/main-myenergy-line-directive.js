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
        		
      		}
    	};
  	});
