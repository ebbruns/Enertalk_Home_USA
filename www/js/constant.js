angular.module('enertalkHomeUSA')
	.constant('DEMO_ACCOUNT', {
		'email': 'home.demo@encoredtech.com',
	    'password': 'dlszhdjem0419'
	})

	.constant('MODE', 'production')

	.constant('APIURL', (function (isDevelopment) {
		var domain = isDevelopment ? 'http://api-staging.encoredtech.com' : 'https://api.encoredtech.com:8082';
		return {
      		'signUpUrl': domain.api + '/1.1/users/basicinfo/signup',
      		'nickNameCheckUrl': domain.api + '/1.1/users/basicinfo/signup/nickName',
      		'nickNameChangeUrl': domain.api + '/1.1/users/basicinfo/nickName',
      		'phoneNumberCheckUrl': domain.api + '/1.1/users/basicinfo/signup/phone',
      		'phoneNumberChangeUrl': domain.api + '/1.1/users/basicinfo/phone',
      		'emailCheckUrl': domain.api + '/1.1/users/basicinfo/signup/email',
      		'emailChangeUrl': domain.api + '/1.1/users/basicinfo/email',
      		'passwordChangeUrl': domain.api + '/1.1/users/basicinfo/password',
      		'passwordResetUrl': domain.api + '/1.1/users/basicinfo/password/reset',
      		'deviceRegisterUrl': domain.api + '/admin/1.2/devices/register',
      		'deviceStatusUrl': function (uuid) {
        		return domain.api + '/1.2/devices/' + uuid + '/status';
      		},
      		'questionSendUrl': domain.api + '/1.1/cs/question/email',
      		'phoneSendUrl': domain.api + '/1.1/users/basicinfo/signup/sms',
      		'emailSendUrl': domain.api + '/1.1/users/basicinfo/auth/code',
      		'profileUrl': domain.api + '/1.1/users/basicinfo',
      		'siteInfoUrl': function (uuid) {
        		return domain.api + '/1.2/sites/' + uuid;
      		},
      		'pushUrl': function (uuid) {
        		return domain.api + '/1.2/devices/' + uuid + '/events/push';
      		},
      		'langUrl': domain.api + '/1.1/users/basicinfo/language',
      		'csUrl': domain.api + '/1.2/cs/contact',
      		'loggingUrl': domain.card + '/logger',
      		'onlineUrl': domain.card + '/online'
    	}
	})())

	.constant('OAUTHURL', (function (isDevelopment) {
		var domain = 'https://enertalk-auth.encoredtech.com',
      		clientId,
      		clientSecret;

      	if (isDevelopment) {
      		clientId = 'RU5DT1JFRF9FTkVSVEFMS19IT01F';
	      	clientSecret = 'oc16745q3cf6cg4239y83mm61a15w9g27dq30a0';
      	} else {
      		clientId = 'RU5DT1JFRF9FTkVSVEFMS19IT01FX1BST0Q=';
	      	clientSecret = 'ek1uf46h30w9x48y06dg4i824x6bn9nc3pe6nv1';
      	}

      	return {
      		'authorizationUrl' : domain + '/authorization',
      		'tokenUrl'         : domain + '/token',
      		'verifyUrl'        : domain + '/verify',
      		'uuidUrl'          : domain + '/uuid',

      		'clientId'         : clientId,
      		'clientSecret'     : clientSecret
    	};
	})())