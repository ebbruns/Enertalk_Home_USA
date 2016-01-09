angular.module('enertalkHomeUSA.controllers')

	.controller('MainSettingCtrl', function($scope, User, Util, $cordovaCamera) {
		function init () {
			var setting = Util.localStorage.getObject('setting'),
				settingKeyList = Object.keys(setting);

			$scope.profile = User.profile;
			$scope.setting = setting;

			if (settingKeyList.indexOf('enableAutoLogin') < 0) {
				$scope.setting.enableAutoLogin = true;
				Util.localStorage.setObject('setting', setting);
			}
			if (settingKeyList.indexOf('enableRealtimePopup') < 0) {
				$scope.setting.enableRealtimePopup = true;
				Util.localStorage.setObject('setting', setting);
			}


		}

		$scope.changeSetting = function () {
			var setting = $scope.setting;
			Util.localStorage.setObject('setting', setting);
		};

		$scope.changeProfileImage = function () {
			document.addEventListener("deviceready", function () {
			    var options = {
			      destinationType: Camera.DestinationType.FILE_URI,
			      sourceType: Camera.PictureSourceType.PHOTOLIBRARY
			    };

			    $cordovaCamera.getPicture(options).then(function(imageURI) {
			      console.log(imageURI);
			      // var image = document.getElementById('myImage');
			      // image.src = imageURI;
			    }, function(err) {
			      // error
			    });
			});
		};

		init ();
	});