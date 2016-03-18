"use strict";
angular.module('app.home')
    .controller('HomeCtrl', ['$rootScope', '$scope', function ($rootScope, $scope) {
        $rootScope.metaTitle = 'ivqTest 爱测试公众号 | 快来测测你的神秘角色';
    }]);