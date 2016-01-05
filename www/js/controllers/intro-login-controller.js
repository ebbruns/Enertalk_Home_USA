angular.module('enertalkHomeUSA.controllers')

	.controller('IntroLoginCtrl', function ($scope, $state) {
		$scope.login = function () {
			$state.go('main.myenergy');
		};
	});