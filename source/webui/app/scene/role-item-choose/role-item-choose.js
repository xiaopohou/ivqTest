"use strict";
angular.module('app.scene')
    .controller('RoleItemChooseCtrl', ['$scope', '$stateParams', '$state', 'roleItemChoose', function ($scope, $stateParams, $state, roleItemChoose) {
        $scope.model = roleItemChoose;
    }]);