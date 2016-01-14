// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('enertalkHomeUSA', ['ionic', 'ngCordova', 'enertalkHomeUSA.controllers', 'enertalkHomeUSA.services'])

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

    // intro views
    .state('intro', {
        url: '/intro',
        abstract: true,
        templateUrl: 'templates/intro/intro.html',
        controller: 'IntroCtrl'
      })

    .state('intro.login', {
      url: '/login',
      views: {
        'introContent': {
          templateUrl: 'templates/intro/intro-login.html',
          controller: 'IntroLoginCtrl'
        }
      }
    })
    // ------------------------------------------

    // tab view
    .state('main', {
      url: '/main',
      cache: false,
      abstract: true,
      templateUrl: 'templates/main/main.html',
      controller: 'MainCtrl'
    })
    // --------------------------------------------

    // myenergy views
    .state('main.myenergy', {
      url: '/myenergy',
      views: {
        'MyenergyContent': {
          templateUrl: 'templates/main/myenergy.html',
          controller: 'MainMyenergyCtrl'
        }
      }
    })

    .state('main.kwh-usage', {
      url: '/kwh-usage',
      views: {
        'MyenergyContent': {
          templateUrl: 'templates/main/kwh-usage.html',
          controller: 'KwhUsageCtrl'
        }
      }
    })

    .state('main.usage-trends', {
      url: '/usage-trends',
      views: {
        'MyenergyContent': {
          templateUrl: 'templates/main/usage-trends.html',
          controller: 'UsageTrendsCtrl'
        }
      }
    })

    .state('main.energy-calendar', {
      url: '/energy-calendar',
      views: {
        'MyenergyContent': {
          templateUrl: 'templates/main/energy-calendar.html',
          controller: 'EnergyCalendarCtrl'
        }
      }
    })
    // ------------------------------------------


    // community views
    .state('main.community', {
      url: '/community',
      views: {
        'CommunityContent': {
          templateUrl: 'templates/main/community.html',
          controller: 'MainCommunityCtrl'
        }
      }
    })


    .state('main.compete', {
        url: '/compete',
        views: {
            'CommunityContent': {
                templateUrl: 'templates/main/compete.html',
                controller: 'CommCompeteCtrl'
            }
        }
    })

    .state('main.compare', {
            url: '/compare',
            views: {
                'CommunityContent': {
                    templateUrl: 'templates/main/compare.html',
                    controller: 'CommCompareCtrl'
                }
            }
        })

        .state('main.forum', {
            url: '/forum',
            views: {
                'CommunityContent': {
                    templateUrl: 'templates/main/forum.html',
                    controller: 'CommForumCtrl'
                }
            }
        })

        .state('main.donate', {
            url: '/donate',
            views: {
                'CommunityContent': {
                    templateUrl: 'templates/main/donate.html',
                    controller: 'CommDonateCtrl'
                }
            }
        })
    // --------------------------------------


    // setting views
    .state('main.setting', {
      url: '/setting',
      views: {
        'SettingContent': {
          templateUrl: 'templates/main/setting.html',
          controller: 'MainSettingCtrl'
        }
      }
    });
    // --------------------------------------

  $urlRouterProvider.otherwise('/intro/login');
});

angular.module('enertalkHomeUSA.controllers', []);
angular.module('enertalkHomeUSA.services', []);

