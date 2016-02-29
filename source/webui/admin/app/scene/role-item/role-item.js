'use strict';
angular.module('app.admin.content')
    .controller('EditRoleItemCtrl', ['$scope', '$stateParams', '$state', '$timeout', 'SweetAlert', 'RoleItemService', 'Upload', 'Tool', function ($scope, $stateParams, $state, $timeout, SweetAlert, RoleItemService, Upload, Tool) {
        var id = $stateParams.id ? $stateParams.id : '';
        $scope.originModel = {};
        $scope.model = {
            roleSceneId: $stateParams.roleSceneId
        };
        $scope.title = id != '' ? '编辑角色成员' : '添加角色成员';

        $scope.initController = function () {
            if (id) {
                RoleItemService.getById(id).then(function (data) {
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

        $scope.save = function () {
            if (id) {
                var modifyModel = Tool.trimSameProperties($scope.originModel, $scope.model);
                RoleItemService.update(id, modifyModel).then(function () {
                    SweetAlert.updateSuccessfully();
                    //TODO:url跳转
                    $state.go('roleScene');
                });
            } else {
                RoleItemService.insert($scope.model).then(function () {
                    SweetAlert.addSuccessfully();
                    //TODO:url跳转
                    $state.go('roleScene');
                });
            }
        };

        $scope.initController();
    }]);