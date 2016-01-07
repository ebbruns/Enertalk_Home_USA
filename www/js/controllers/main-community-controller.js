angular.module('enertalkHomeUSA.controllers')

  .controller('MainCommunityCtrl', function ($scope,$state) {
      $scope.compete = function () {
          $state.go('main.compete');
      };

      $scope.compare = function () {
          $state.go('main.compare');
      };

      $scope.forum = function () {
          $state.go('main.forum');
      };

      $scope.donate = function () {
          $state.go('main.donate');
      };

  });