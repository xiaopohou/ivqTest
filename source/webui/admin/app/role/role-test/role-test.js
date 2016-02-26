'use strict';
angular.module('app.admin.content')
    .controller('ListRoleTestCtrl', ['$scope', '$state', 'SweetAlert', 'RoleTestService', 'Tool', function ($scope, $state, SweetAlert, RoleTestService, Tool) {
        $scope.getResource = function (params, paramsObj) {
            return RoleTestService.loadList(paramsObj).then(function (response) {
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
                        RoleTestService.delete(id).then(function () {
                            SweetAlert.deleteSuccessfully();
                            $state.reload();
                        });
                    }
                });
        };
    }])
    .controller('EditRoleTestCtrl', ['$scope', '$stateParams', '$state', 'SweetAlert', 'RoleTestService', 'Tool', function ($scope, $stateParams, $state, SweetAlert, RoleTestService, Tool) {
        var id = $stateParams.id ? $stateParams.id : '';
        $scope.originModel = {};
        $scope.model = {};
        $scope.title = id != '' ? '编辑角色场景' : '添加角色场景';

        $scope.initController = function () {
            if (id) {
                RoleTestService.getById(id).then(function (data) {
                    data.createTime = Tool.convertTime(data.createTime);
                    $scope.model = data;
                    $scope.originModel = Tool.deepCopy($scope.model);
                });
            }
        };

        $scope.save = function () {
            if (id) {
                var modifyModel = Tool.trimSameProperties($scope.originModel, $scope.model);
                RoleTestService.update(id, modifyModel).then(function () {
                    SweetAlert.updateSuccessfully();
                    $state.go('roleTest');
                });
            } else {
                RoleTestService.insert($scope.model).then(function () {
                    SweetAlert.addSuccessfully();
                    $state.go('roleTest');
                });
            }
        };

        $scope.initController();
    }]);