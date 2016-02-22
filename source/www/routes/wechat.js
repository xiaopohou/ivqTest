var express = require('express'),
    router = express.Router(),
    WechatAPI = require('wechat-api'),
    setting = require('../config/setting.js');

router
    .get('/api/wechat', function (req, res, next) {
        var api = new WechatAPI(setting.appId, setting.appSecret);
        api.getAccessToken(function (err, token) {
            console.log(err);
            res.send(token);
        });
    });

module.exports = router;