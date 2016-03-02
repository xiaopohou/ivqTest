'use strict';
angular.module('app.admin.scene')
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
    .controller('EditRoleSceneCtrl', ['$scope', '$stateParams', '$state', '$timeout', 'SweetAlert', 'RoleSceneService', 'RoleItemService', 'Upload', 'Tool', function ($scope, $stateParams, $state, $timeout, SweetAlert, RoleSceneService, RoleItemService, Upload, Tool) {
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

        $scope.uploadImage = function (file, errFiles) {
            $scope.f = file;
            $scope.errFile = errFiles && errFiles[0];
            if (file) {
                file.upload = Upload.upload({
                    url: '/api/uploads',
                    data: {file: file}
                });

                file.upload.then(function (response) {
                    $timeout(function () {
                        file.result = response.data.success;
                        $scope.model.coverImg = response.data.imgUrl;
                    });
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 *
                        evt.loaded / evt.total));
                });
            }
        };

        $scope.showOriginImg = function(){
            $('.img-link').fancybox();
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