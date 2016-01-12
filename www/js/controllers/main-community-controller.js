angular.module('enertalkHomeUSA.controllers')

  .controller('MainCommunityCtrl', function ($scope,$state) {
      $scope.compete = function () {
          $state.go('main.compete');
      };

      $scope.compare = function () {
          $state.go('main.compare-edit-intro');
      };

      //Stub for when the app has a built in forum feature instead of a Facebook link
      //$scope.forum = function () {
          //$state.go('main.forum');
      //};

      $scope.donate = function () {
          $state.go('main.donate');
      };

  });