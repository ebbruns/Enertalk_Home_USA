// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('enertalkHomeUSA', ['ionic', 'enertalkHomeUSA.controllers', 'enertalkHomeUSA.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('intro', {
        url: '/intro',
        abstract: true,
        templateUrl: 'templates/intro/intro.html',
        controller: 'IntroCtrl'
      })

    .state('intro.login', {
      url: '/login',
      views: {
        'introContent':{
          templateUrl: 'templates/intro/intro-login.html',
          controller: 'IntroLoginCtrl'
        }
      }
    })

    .state('main', {
      url: '/main',
      cache: false,
      abstract: true,
      templateUrl: 'templates/main/main-home.html',
      controller: 'MainHomeCtrl'
    });

  $urlRouterProvider.otherwise('/intro/login');
});

angular.module('enertalkHomeUSA.controllers', []);
angular.module('enertalkHomeUSA.services', []);

