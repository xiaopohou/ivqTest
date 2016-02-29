'use strict';
angular.module('app.admin.content')
    .controller('ListRoleSceneCtrl', ['$scope', '$state', 'SweetAlert', 'RoleSceneService', 'Tool', function ($scope, $state, SweetAlert, RoleSceneService, Tool) {
        $scope.getResource = function (params, paramsObj) {
            return RoleSceneService.loadList(paramsObj).then(function (response) {
                response.data.rows = _.each(response.data.rows, function (data) {
                    data.createTime = Tool.convertTime(data.createTime);
                });
                return {
                    rows: response.data.rows,
                    header: [],
                    pagination: response.data.pagination,
                    sortBy: '',
                    sortOrder: ''
                }
            });
        };

        $scope.remove = function (id) {
            SweetAlert.deleteConfirm(
                function (isConfirm) {
                    if (isConfirm) {
                        RoleSceneService.delete(id).then(function () {
                            SweetAlert.deleteSuccessfully();
                            $state.reload();
                        });
                    }
                });
        };
    }])
    .controller('EditRoleSceneCtrl', ['$scope', '$stateParams', '$state', 'SweetAlert', 'RoleSceneService', 'RoleItemService', 'Tool', function ($scope, $stateParams, $state, SweetAlert, RoleSceneService, RoleItemService, Tool) {
        var id = $stateParams.id ? $stateParams.id : '';
        $scope.originModel = {};
        $scope.model = {};
        $scope.title = id != '' ? '编辑角色场景' : '添加角色场景';

        $scope.initController = function () {
            if (id) {
                RoleSceneService.getById(id).then(function (data) {
                    data.createTime = Tool.convertTime(data.createTime);
                    $scope.model = data;
                    $scope.originModel = Tool.deepCopy($scope.model);
                });
            }
        };

        $scope.save = function () {
            if (id) {
                var modifyModel = Tool.trimSameProperties($scope.originModel, $scope.model);
                RoleSceneService.update(id, modifyModel).then(function () {
                    SweetAlert.updateSuccessfully();
                    $state.go('roleScene');
                });
            } else {
                RoleSceneService.insert($scope.model).then(function () {
                    SweetAlert.addSuccessfully();
                    $state.go('roleScene');
                });
            }
        };

        //角色成员
        $scope.filterBy = {'roleScene': id};
        $scope.getResource = function (params, paramsObj) {
            return RoleItemService.loadList(paramsObj).then(function (response) {
                response.data.rows = _.each(response.data.rows, function (data) {
                    data.createTime = Tool.convertTime(data.createTime);
                });
                return {
                    rows: response.data.rows,
                    header: [],
                    pagination: response.data.pagination,
                    sortBy: '',
                    sortOrder: ''
                }
            });
        };

        $scope.remove = function (id) {
            SweetAlert.deleteConfirm(
                function (isConfirm) {
                    if (isConfirm) {
                        RoleItemService.delete(id).then(function () {
                            SweetAlert.deleteSuccessfully();
                            $state.reload();
                        });
                    }
                });
        };

        $scope.initController();
    }]);