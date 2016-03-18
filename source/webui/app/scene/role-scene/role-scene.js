"use strict";
angular.module('app.scene')
    .controller('RoleSceneCtrl', ['$scope', '$rootScope', '$stateParams', '$state', '$window', 'RoleItemChooseService', 'roleScene', 'WechatService', function ($scope, $rootScope, $stateParams, $state, $window, RoleItemChooseService, roleScene, WechatService) {
        $scope.roleScene = roleScene;
        $rootScope.metaTitle = $scope.roleScene.title;

        $scope.model = {
            sceneId: $stateParams.id
        };

        $scope.submit = function () {
            RoleItemChooseService.insert($scope.model).then(function (data) {
                $window.location.href = '/role-item-choose/' + data + '/result';
            });
        };

        WechatService.getJsConfig().then(function (res) {
            wx.config(res.data);
            $scope.jsConfig = res.data;
        });

        $scope.$watch('jsConfig', function (newValue, oldValue) {
            if (newValue != oldValue) {
                wx.ready(function () {
                    var shareData = {
                        title: $scope.roleScene.title,
                        desc: "ivqTest爱测试，快来测测你的神秘角色",
                        link: $window.location.origin + '/role-scene/' + $scope.roleScene._id,
                        imgUrl: $window.location.origin + $scope.roleScene.coverImg,
                        success: function () {
                        },
                        cancel: function () {
                        }
                    };
                    wx.onMenuShareTimeline(shareData);
                    wx.onMenuShareAppMessage(shareData);
                });
            }
        });
    }]);