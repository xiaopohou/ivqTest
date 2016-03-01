"use strict";
angular.module('app.scene')
    .controller('RoleSceneCtrl', ['$scope', '$stateParams', '$state', '$window', 'SweetAlert', 'RoleItemChooseService', 'roleScene', function ($scope, $stateParams, $state, $window, SweetAlert, RoleItemChooseService, roleScene) {
        $scope.roleScene = roleScene;

        $scope.model = {
            sceneId : $stateParams.id
        };

        $scope.submit = function () {
            RoleItemChooseService.insert($scope.model).then(function(data){
                $window.location.href= '/roleItemChoose/' + data;
            });
        };
    }]);