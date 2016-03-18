'use strict';
angular.module('common.services')
    .factory('WechatService', ['$http', 'ServerConfig', 'appHttp', function ($http, ServerConfig, appHttp) {
        return {
            getJsConfig: function (params) {
                var config = {
                    method: 'GET',
                    url: ServerConfig.apiUrl + "getJsConfig",
                    params: params
                };
                return $http(config);
            }
        };
    }]);