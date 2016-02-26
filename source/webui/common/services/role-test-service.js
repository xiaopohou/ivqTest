'use strict';
angular.module('common.services')
    .factory('RoleTestService', ['$http', 'ServerConfig', 'appHttp', function ($http, ServerConfig, appHttp) {
        return {
            loadList: function (params) {
                var config = {
                    method: 'GET',
                    url: ServerConfig.apiUrl + "roleTests",
                    params: params
                };
                return $http(config);
            },
            getAll: function (params) {
                var config = {
                    method: 'GET',
                    url: ServerConfig.apiUrl + "roleTests/all",
                    params: params
                };
                return appHttp.request(config);
            },
            getById: function (id) {
                var config = {
                    method: 'GET',
                    url: ServerConfig.apiUrl + "roleTests/" + id
                };
                return appHttp.request(config);
            },
            insert: function (data) {
                var config = {
                    method: 'POST',
                    url: ServerConfig.apiUrl + "roleTests",
                    data: data
                };
                return appHttp.request(config);
            },
            update: function (id, data) {
                var config = {
                    method: 'PUT',
                    url: ServerConfig.apiUrl + "roleTests/" + id,
                    data: data
                };
                return appHttp.request(config);
            },
            delete: function (id) {
                var config = {
                    method: 'DELETE',
                    url: ServerConfig.apiUrl + "roleTests/" + id
                };
                return appHttp.request(config);
            }
        };
    }]);