'use strict';
angular.module('common.services')
    .factory('RoleItemChooseService', ['$http', 'ServerConfig', 'appHttp', function ($http, ServerConfig, appHttp) {
        return {
            loadList: function (params) {
                var config = {
                    method: 'GET',
                    url: ServerConfig.apiUrl + "roleItemChooses",
                    params: params
                };
                return $http(config);
            },
            getAll: function (params) {
                var config = {
                    method: 'GET',
                    url: ServerConfig.apiUrl + "roleItemChooses/all",
                    params: params
                };
                return appHttp.request(config);
            },
            getById: function (id) {
                var config = {
                    method: 'GET',
                    url: ServerConfig.apiUrl + "roleItemChooses/" + id
                };
                return appHttp.request(config);
            },
            insert: function (data) {
                var config = {
                    method: 'POST',
                    url: ServerConfig.apiUrl + "roleItemChooses",
                    data: data
                };
                return appHttp.request(config);
            },
            update: function (id, data) {
                var config = {
                    method: 'PUT',
                    url: ServerConfig.apiUrl + "roleItemChooses/" + id,
                    data: data
                };
                return appHttp.request(config);
            },
            delete: function (id) {
                var config = {
                    method: 'DELETE',
                    url: ServerConfig.apiUrl + "roleItemChooses/" + id
                };
                return appHttp.request(config);
            }
        };
    }]);