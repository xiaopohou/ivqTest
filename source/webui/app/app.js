'use strict';
angular.module('common.config', []);
angular.module('common.directives', []);
angular.module('common.filters', []);
angular.module('common.services', ['common.config', 'common.util']);
angular.module('common.util', []);
angular.module('app.templates', []);
angular.module('app.home', []);
angular.module('app.nav', []);
angular.module('app.article', ['ui.bootstrap', 'common.services']);
angular.module('app.scene', ['common.services']);

var app = angular.module('app', [
    'ngCookies',
    'ui.router',
    'ui.bootstrap',
    'common.config',
    'common.directives',
    'common.filters',
    'common.services',
    'common.util',
    'app.templates',
    'app.home',
    'app.article',
    'app.scene'
]);

app.controller('AppCtrl', ['$rootScope', '$sce', 'PackageInfo', function ($rootScope, $sce, PackageInfo) {
    $rootScope.packageInfo = PackageInfo;
    $rootScope.copysymbol = '&copy;';
    $rootScope.copysymbol = $sce.trustAsHtml($rootScope.copysymbol);
    $rootScope.author = 'by' + $rootScope.packageInfo.author + '.';
}]);

app.run(['$rootScope', '$state', '$stateParams', '$cookies', function ($rootScope, $state, $stateParams, $cookies) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    var globals = $cookies.getObject('ivqTest');
    if (globals && globals.currentUser) {
        $rootScope.currentUser = globals.currentUser.data;
    }
}]);