'use strict';
angular.module('app.admin.layout')
    .directive('sidebarMenu', function () {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            templateUrl: 'app/layout/sidebar-menu/sidebar-menu.tpl.html',
            controller: ['$rootScope', '$scope', '$location', function ($rootScope, $scope, $location) {
                $scope.tabs = [
                    {
                        "title": "首页",
                        "route": "home",
                        "icon": "fa-home",
                        "active": false,
                        "expanded": false,
                        "childs": []
                    },
                    {
                        "title": "角色场景管理",
                        "route": "roleScene, roleItem",
                        "icon": "",
                        "active": false,
                        "expanded": false,
                        "childs": [
                            {
                                "title": "场景管理",
                                "route": "roleScene",
                                "icon": "",
                                "active": false
                            },
                            {
                                "title": "成员管理",
                                "route": "roleItem",
                                "icon": "",
                                "active": false
                            }
                        ]
                    },
                    {
                        "title": "设置管理",
                        "route": "account, site",
                        "icon": "",
                        "active": false,
                        "expanded": false,
                        "childs": [
                            {
                                "title": "账号设置",
                                "route": "account",
                                "icon": "",
                                "active": false
                            }
                        ]
                    }
                ];

                $scope.initTabs = function () {
                    var path = $location.url();
                    $scope.tabs = _.each($scope.tabs, function (tab) {
                        tab.active = path.indexOf(tab.route) > -1 ? true : false;
                        return _.each(tab.childs, function (child) {
                            if (path.indexOf(child.route) > -1) {
                                tab.active = true;
                                child.active = true;
                            }else{
                                child.active = false;
                            }
                            return tab;
                        });
                    });
                };

                $scope.expandTab = function (selectedTab) {
                    $scope.tabs = _.each($scope.tabs, function (tab) {
                        if (selectedTab == tab) {
                            tab.expanded = !tab.expanded;
                            tab.active = !tab.active;
                        } else {
                            tab.active = false;
                        }
                        return tab;
                    });
                };

                $rootScope.$on('$stateChangeSuccess', function () {
                    $scope.initTabs();
                });
            }]
        };
    });