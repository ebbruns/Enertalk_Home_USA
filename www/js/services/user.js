angular.module('enertalkHomeUSA.services')
	
	.service('User', function () {
		
		this.init = function () {
			this.uuid = undefined;
			this.profile = {};
			this.deviceStatus = 'NOT_REGISTERED';
			this.accesstoken = undefined;
			this.refreshtoken = undefined;
		};

		this.login = function () {
			
		};

		this.logout = function () {

		};

	});