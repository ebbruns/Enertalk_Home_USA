angular.module('enertalkHomeUSA.controllers')

	.controller('IntroLoginCtrl', function ($scope, $state) {
		
		$scope.login = function () {
			$state.go('main.myenergy')
		};

		$scope.logout = function () {

		};

		$scope.passwordRecovery = function () {

		};

		$scope.signup = function () {

		};
		
	});