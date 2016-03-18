"use strict";
angular.module('app.scene')
    .controller('RoleItemChooseCtrl', ['$rootScope', '$scope', '$stateParams', '$state', '$window', '$timeout', 'roleItemChoose', 'WechatService', 'WeChatJsConfig', function ($rootScope, $scope, $stateParams, $state, $window, $timeout, roleItemChoose, WechatService, WeChatJsConfig) {
        $scope.isShare = $stateParams.action == 'share' ? true : false;

        $scope.roleItemChoose = roleItemChoose;
        $scope.roleItem = roleItemChoose.roleItem;
        $scope.roleScene = roleItemChoose.roleItem.roleScene;

        $rootScope.metaTitle = $scope.roleItemChoose.key + '，在' + $scope.roleScene.name + '中是' + $scope.roleItem.name;
        $scope.roleSceneUrl = $window.location.origin + '/role-scene/' + $scope.roleScene._id;

        $scope.toggleShareTip = function () {
            $(".share-layer").toggle();
        };

        WechatService.getJsConfig(WeChatJsConfig).then(function (res) {
            wx.config(res.data);
            wx.ready(function () {
                var title = $scope.roleItemChoose.key + '，在' + $scope.roleScene.name + '中是' + $scope.roleItem.name;
                var link = $window.location.origin + '/role-item-choose/' + $scope.roleItemChoose._id + '/share';
                var imgUrl = $window.location.origin + $scope.roleItem.coverImg;
                wx.onMenuShareTimeline({
                    title: title,
                    link: link,
                    imgUrl: imgUrl
                });
                wx.onMenuShareAppMessage({
                    title: title,
                    link: link,
                    imgUrl: imgUrl,
                    desc: 'ivqTest爱测试，快来测测你的神秘角色'
                });
                wx.onMenuShareQQ({
                    title: title,
                    link: link,
                    imgUrl: imgUrl,
                    desc: 'ivqTest爱测试，快来测测你的神秘角色'
                });
            });
        });
    }]);