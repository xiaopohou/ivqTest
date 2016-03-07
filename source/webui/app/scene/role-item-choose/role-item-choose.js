"use strict";
angular.module('app.scene')
    .controller('RoleItemChooseCtrl', ['$scope', '$stateParams', '$state', 'roleItemChoose', function ($scope, $stateParams, $state, roleItemChoose) {
        $scope.isShare = $stateParams.action == 'result' ? false : true;
        $scope.roleItemChoose = roleItemChoose;
        $scope.roleItem = roleItemChoose.roleItem;
        $scope.roleScene = roleItemChoose.roleItem.roleScene;
    }]);