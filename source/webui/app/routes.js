'use strict';
angular.module('app')
    .config(["$locationProvider", '$stateProvider', '$urlRouterProvider', 'UIRouterMetatagsProvider', function ($locationProvider, $stateProvider, $urlRouterProvider, UIRouterMetatagsProvider) {

        //TODO:
        UIRouterMetatagsProvider
            .setTitlePrefix('')
            .setTitleSuffix(' | ivqTest')
            .setDefaultTitle('ivqTest：爱测试')
            .setOGURL(true);

        $locationProvider.html5Mode(true).hashPrefix('!');

        $stateProvider
            .state('/', {
                url: '/'
            })
            .state('roleScene', {
                url: '/roleScene/:id',
                templateUrl: 'scene/role-scene/role-scene.tpl.html',
                controller: 'RoleSceneCtrl',
                resolve: {
                    roleScene: ['$stateParams', 'RoleSceneService', function ($stateParams, RoleSceneService) {
                        return RoleSceneService.getById($stateParams.id);
                    }]
                }
            })
            .state('roleItemChoose', {
                url: '/roleItemChoose/:id',
                templateUrl: 'scene/role-item-choose/role-item-choose.tpl.html',
                controller: 'RoleItemChooseCtrl',
                resolve: {
                    roleItemChoose: ['$stateParams', 'RoleItemChooseService', function ($stateParams, RoleItemChooseService) {
                        return RoleItemChooseService.getById($stateParams.id);
                    }]
                }
            });
    }]);