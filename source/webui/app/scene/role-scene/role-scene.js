"use strict";
angular.module('app.scene')
    .controller('RoleSceneCtrl', ['$rootScope', '$scope', '$stateParams', '$state', '$window', 'RoleItemChooseService', 'roleScene', 'WechatService', 'WeChatJsConfig', function ($rootScope, $scope, $stateParams, $state, $window, RoleItemChooseService, roleScene, WechatService, WeChatJsConfig) {
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

        WechatService.getJsConfig(WeChatJsConfig).then(function (res) {
            wx.config(res.data);
            wx.ready(function () {
                var title = $scope.roleScene.title;
                var link = $window.location.origin + '/role-scene/' + $scope.roleScene._id;
                var imgUrl = $window.location.origin + $scope.roleScene.coverImg;

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