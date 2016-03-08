"use strict";
angular.module('app.scene')
    .controller('RoleItemChooseCtrl', ['$scope', '$stateParams', '$state', '$window', 'roleItemChoose', function ($scope, $stateParams, $state, $window, roleItemChoose) {
        $scope.isShare = $stateParams.action == 'result' ? false : true;

        $scope.roleItemChoose = roleItemChoose;
        $scope.roleItem = roleItemChoose.roleItem;
        $scope.roleScene = roleItemChoose.roleItem.roleScene;

        $scope.roleSceneUrl = $window.location.origin + '/roleScene/' + $scope.roleScene._id;

        $scope.toggleShareTip = function () {
            $(".share-layer").toggle();
        };
    }]);