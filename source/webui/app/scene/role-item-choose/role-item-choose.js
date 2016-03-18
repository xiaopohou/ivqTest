"use strict";
angular.module('app.scene')
    .controller('RoleItemChooseCtrl', ['$scope', '$stateParams', '$state', '$window', '$timeout', 'roleItemChoose', 'WechatService', function ($scope, $stateParams, $state, $window, $timeout, roleItemChoose, WechatService) {
        $scope.isShare = $stateParams.action == 'share' ? true : false;

        $scope.roleItemChoose = roleItemChoose;
        $scope.roleItem = roleItemChoose.roleItem;
        $scope.roleScene = roleItemChoose.roleItem.roleScene;

        $scope.roleSceneUrl = $window.location.origin + '/role-scene/' + $scope.roleScene._id;

        $scope.toggleShareTip = function () {
            $(".share-layer").toggle();
        };

        WechatService.getJsConfig().then(function (res) {
            wx.config(res.data);
            $scope.jsConfig = res.data;
        });

        $scope.$watch('jsConfig', function (newValue, oldValue) {
            if (newValue != oldValue) {
                wx.ready(function () {
                    var shareData = {
                        title: $scope.roleItemChoose.key + "，在" + $scope.roleScene.name + "中是" + $scope.roleItem.name,
                        desc: "ivqTest爱测试，快来测测你的神秘角色",
                        link: $window.location.origin + '/role-item-choose/' + $scope.roleScene._id + '/share',
                        imgUrl: $window.location.origin + $scope.roleItem.coverImg,
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