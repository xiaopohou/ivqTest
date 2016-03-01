"use strict";
angular.module('app.scene')
    .controller('RoleItemChooseCtrl', ['$scope', '$stateParams', '$state', 'SweetAlert', 'roleItemChoose', function ($scope, $stateParams, $state, SweetAlert, roleItemChoose) {
        $scope.model = roleItemChoose;
    }]);