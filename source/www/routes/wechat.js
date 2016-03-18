var express = require('express'),
    router = express.Router(),
    wechat = require('wechat'),
    WechatAPI = require('wechat-api'),
    config = require('../config/setting.js').wechat,
    User = require('../models/user');
var api = new WechatAPI(config.appId, config.appSecret);

router
    .use('/api/wechat', wechat(config.token).text(function (message, req, res, next) {
        res.reply('text:' + message);
    }).event(function (message, req, res, next) {
        if (message.Event == 'subscribe') {
            User.getByFilter({'wechatOpenId': message.FromUserName}, function (err, user) {
                if (err)
                    return res.reply(err);
                if (user == null) {
                    var wechatUser = new User({
                        wechatOpenId: message.FromUserName,
                        wechatSubscribe: true
                    });
                    wechatUser.save(function (err) {
                        if (err)
                            return res.reply(err);
                        res.reply('首次关注我的公众号');
                    });
                }
                else {
                    User.update2(user._id, {
                        'wechatSubscribe': true,
                        'wechatCancelSubscribeTime': null
                    }, function (err) {
                        if (err)
                            return res.reply(err);
                        res.reply('重新关注我的公众号');
                    });
                }
            });
        } else if (message.Event == 'unsubscribe') {
            User.getByFilter({'wechatOpenId': message.FromUserName}, function (err, user) {
                if (err)
                    return res.reply(err);
                User.update2(user._id, {
                    'wechatSubscribe': false,
                    'wechatCancelSubscribeTime': new Date()
                }, function (err) {
                    if (err)
                        return res.reply(err);
                    res.reply('取消关注');
                });
            });
        } else if (message.Event == 'CLICK') {
            var eventKey = message.EventKey;
            if (eventKey == 'menu_1') {
                res.reply([
                    {
                        title: '单图文',
                        description: '1',
                        picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
                        url: 'http://nodeapi.cloudfoundry.com/'
                    }
                ]);
            } else if (eventKey == 'menu_2') {
                res.reply([
                    {
                        title: '多图文1',
                        description: '1',
                        picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
                        url: 'http://nodeapi.cloudfoundry.com/'
                    },
                    {
                        title: '多图文2',
                        description: '2',
                        picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
                        url: 'http://nodeapi.cloudfoundry.com/'
                    }
                ]);
            }
            else if (eventKey == 'menu_3') {
                res.reply('test test');
            } else {
                res.reply(JSON.stringify(message));
            }
        } else {
            res.reply('event:' + message.Event);
        }
    }).middlewarify())
    .get('/api/massSendText', function (req, res, next) {
        api.massSendText('佳佳是大菜鸟，哈哈哈哈', 'oomHRsobWV_lHUZ99tZBvGswriho', function (err, result) {
            res.send(result);
        });
    })
    .get('/api/createMenu', function (req, res, next) {
        api.createMenu(config.menu, function (err, result) {
            res.send(result);
        });
    })
    .get('/api/getMenu', function (req, res, next) {
        api.getMenu(function (err, result) {
            res.send(result);
        });
    })
    .get('/api/removeMenu', function (req, res, next) {
        api.removeMenu(function (err, result) {
            res.send(result);
        });
    })
    .get('/api/getJsConfig', function (req, res, next) {
        var debug = req.query.debug == 'true' ? true : false;
        var params = {
            url: req.query.url,
            debug: debug,
            jsApiList: req.query.jsApiList
        };
        api.getJsConfig(params, function (err, result) {
            res.send(result);
        })
    });

module.exports = router;