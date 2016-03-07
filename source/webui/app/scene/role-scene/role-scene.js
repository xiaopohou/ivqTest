"use strict";
angular.module('app.scene')
    .controller('RoleSceneCtrl', ['$scope', '$rootScope', '$stateParams', '$state', '$window', 'RoleItemChooseService', 'roleScene', function ($scope, $rootScope, $stateParams, $state, $window, RoleItemChooseService, roleScene) {
        $scope.roleScene = roleScene;
        $rootScope.metaTitle = $scope.roleScene.title;

        $scope.model = {
            sceneId : $stateParams.id
        };

        $scope.submit = function () {
            RoleItemChooseService.insert($scope.model).then(function(data){
                $window.location.href= '/roleItemChoose/' + data + '/result';
            });
        };
    }]);