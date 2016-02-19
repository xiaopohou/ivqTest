"use strict";
angular.module('app.article')
    .controller('PostCtrl', ['$rootScope', '$scope', '$stateParams', '$sce', '$state', '$timeout', '$window', 'SweetAlert', 'ArticleService', 'CommentService', 'Tool', 'article', function ($rootScope, $scope, $stateParams, $sce, $state, $timeout, $window, SweetAlert, ArticleService, CommentService, Tool, article) {
        $scope.model = {};

        $scope.initController = function () {
            article = Tool.transformArticleUrl(article);
            $scope.article = article;
            $scope.article.content = $sce.trustAsHtml($scope.article.content);
            $scope.model.article = $scope.article._Id;
            if ($rootScope.currentUser) {
                $scope.model.userName = 'ivqBlog';
                $scope.model.email = $rootScope.currentUser.email;
            }
            $timeout(function(){
                SyntaxHighlighter.highlight();
            }, 0);
        };

        $scope.redirect = function(){
            var url = "http://" + $window.location.host + "/admin/article/edit/" + article._id;
            $window.location.href = url;
        };

        $scope.reply = function (id, userName) {
            $scope.model.reply = id;
            $scope.replyKey = "回复" + userName + ":";
            $scope.model.content = $scope.replyKey;
        };

        $scope.delete = function (id) {
            CommentService.delete(id).then(function (data) {
                SweetAlert.deleteSuccessfully();
                $state.reload();
            })
        };

        $scope.submit = function () {
            $scope.model.article = $scope.article._id;
            if ($scope.model.content.indexOf($scope.replyKey) == 0) {
                $scope.model.content = $scope.model.content.replace($scope.replyKey, '');
            }
            CommentService.insert($scope.model).then(function (data) {
                SweetAlert.submitSuccessfully();
                $state.reload();
            })
        };

        $scope.initController();
    }]);