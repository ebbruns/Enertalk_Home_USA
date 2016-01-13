angular.module('enertalkHomeUSA.controllers')

.controller('CommCompareEditCtrl', function ($scope, $state) {
    $scope.edit = function () {
        $state.go('main.compare-edit-intro')
    }

    $scope.gotoSize = function () {
        $state.go('main.compare-edit-size');
    }

    $scope.gotoFamily = function () {
        $state.go('main.compare-edit-family');
    }

    $scope.gotoRooms = function () {
        $state.go('main.compare-edit-rooms');
    }

    $scope.gotoFeatures = function () {
        $state.go('main.compare-edit-features');
    }

    $scope.doneEditing = function () {
        //home.done = true;  ??? is this how to make a flag to show done-ness?
        $state.go('main.compare');
    }
});