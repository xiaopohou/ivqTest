'use strict';
angular.module('app.admin')
    .config(["$locationProvider", '$stateProvider', '$urlRouterProvider', function ($locationProvider, $stateProvider, $urlRouterProvider) {
        $locationProvider.html5Mode(true).hashPrefix('!');

        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('home', {
                url: '/home',
                views: {
                    '': {templateUrl: 'app/home/home.tpl.html'}
                },
                ncyBreadcrumb: {
                    label: '首页'
                }
            })
            .state('roleScene', {
                url: '/roleScene/list',
                templateUrl: 'app/scene/role-scene/list.tpl.html',
                controller: 'ListRoleSceneCtrl',
                ncyBreadcrumb: {
                    parent: function ($scope) {
                        return 'home';
                    },
                    label: '角色场景管理'
                }
            })
            .state('editRoleScene', {
                url: '/roleScene/edit/:id?',
                templateUrl: 'app/scene/role-scene/edit.tpl.html',
                controller: 'EditRoleSceneCtrl',
                ncyBreadcrumb: {
                    parent: function ($scope) {
                        return 'roleScene';
                    },
                    label: '{{title}}'
                }
            })
            .state('editRoleItem', {
                url: '/roleItem/edit/:roleSceneId?/:id?',
                templateUrl: 'app/scene/role-item/edit.tpl.html',
                controller: 'EditRoleItemCtrl',
                ncyBreadcrumb: {
                    parent: function ($scope) {
                        return 'roleScene';
                    },
                    label: '{{title}}'
                }
            })
            .state('account', {
                url: '/setting/account',
                templateUrl: 'app/setting/account/account.tpl.html',
                controller: 'AccountCtrl',
                ncyBreadcrumb: {
                    parent: function ($scope) {
                        return 'home';
                    },
                    label: '账号设置'
                }
            })
    }]);