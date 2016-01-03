angular.module('enertalkHomeUSA.services')

  .service('Util', function ($window, $ionicLoading, $ionicModal, $log, $interval, $timeout, $http, $ionicSideMenuDelegate, API) {

    this.querystring = {
      stringify: function (obj) {
        var str = '',
          k = Object.keys(obj);
        for (var i = 0; i <k.length; i += 1) {
          if (i) {
            str += '&';
          }
          str += k[i] + '=' + obj[k[i]];
        }
        return str;
      },
      parse: function (url) {

        var qs = url.split('?')[1],
          arr = qs.split('&'),
          obj = {},
          s, key, value;

        for (var i = 0, len = arr.length; i < len; i += 1) {
          s = arr[i].split('=');
          key = s[0];
          value = s[1];
          if (key && value) {
            obj[key] = value;
          }
        }

        return obj;
      }
    };

    this.encodeAuthHeader = {
      basic: function (clientId, clientSecret) {
        return 'Basic ' + window.btoa(clientId + ':' + clientSecret);
      },
      bearer: function (accessToken) {
        return 'Bearer ' + accessToken;
      }
    };

    this.localStorage = {
      set: function(key, value) {
        $window.localStorage[key] = value;
      },
      get: function(key, defaultValue) {
        return $window.localStorage[key] || defaultValue;
      },
      setObject: function(key, value) {
        $window.localStorage[key] = JSON.stringify(value);
      },
      getObject: function(key) {
        return JSON.parse($window.localStorage[key] || '{}');
      },
      remove: function(key) {
        delete $window.localStorage[key];
      }
    };

    this.checkOnline = function () {
      return $http.get(API.onlineUrl);
    };

  });
