'use strict';
angular.module('app.admin.common')
    .controller('LoginCtrl', ["$scope", "$window", "AuthService", function ($scope, $window, AuthService) {
        $scope.model = {
            isRemember: true
        };

        $scope.Login = function () {
            if(_.isUndefined($scope.model.username) || _.isUndefined($scope.model.password)){
                $scope.errorMessage = "用户名和密码不能为空";
                return;
            }

            AuthService.Login($scope.model.username, $scope.model.password).then(function (data) {
                if(data.token){
                    AuthService.setCredentials(data, $scope.model.isRemember);
                    $window.location.href = "/admin";
                }
            }, function(data){
                $scope.errorMessage = data.errors;
            });
        };
    }]);