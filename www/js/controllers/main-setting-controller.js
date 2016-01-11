angular.module('enertalkHomeUSA.controllers')

	.controller('MainSettingCtrl', function($scope, User, Util, $cordovaCamera, $log, $window) {
		function init () {
			var setting = Util.localStorage.getObject('setting'),
				profileImage = Util.localStorage.get('profileImageURI') || './img/user.png',
				settingKeyList = Object.keys(setting),
				imageTarget = document.getElementById('profile-image');

			$scope.profile = User.profile;
			$scope.setting = setting;
			imageTarget.src = "data:image/jpeg;base64," + profileImage;

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
			      destinationType: Camera.DestinationType.DATA_URL,
			      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
			      allowEdit: true,
			      encodingType: Camera.EncodingType.JPEG,
			    };

			    $cordovaCamera.getPicture(options).then(function(imageData) {
			    	var image = document.getElementById('profile-image');
				  	
				  	image.src = "data:image/jpeg;base64," + imageData;
			      	Util.localStorage.set('profileImageURI', imageData);    	
			    }, function(err) {
			     	$log.info(err);
			    });
			});
		};

		init ();
	});