var express = require('express'),
    router = express.Router(),
    RoleScene = require('../models/roleScene'),
    RoleItem = require('../models/roleItem'),
    RoleItemChoose = require('../models/roleItemChoose'),
    jwtAuth = require('../config/jwtAuth.js');

router
    .get('/api/roleItemChooses', function (req, res, next) {
        var options = {
            sortBy: {displayOrder: 1},
            page: req.query.page - 1,
            count: req.query.count
        };
        RoleItemChoose.list(options, function (err, roleItemChooses) {
            if (err)
                return res.status(500).send(err);
            RoleItemChoose.count({}, function (err, total) {
                if (err)
                    return res.status(500).send(err);
                res.send({
                    rows: roleItemChooses,
                    pagination: {
                        count: parseInt(req.query.count),
                        page: parseInt(req.query.page),
                        pages: Math.round(total / req.query.count),
                        size: total
                    }
                });
            });
        });
    })
    .get('/api/roleItemChooses/:id', function (req, res, next) {
        RoleItemChoose.getById(req.params.id, function (err, roleItemChoose) {
            if (err)
                return res.status(500).send(err);
            RoleScene.getById(roleItemChoose.roleItem.roleScene, function(err, roleScene){
                roleItemChoose.roleItem.roleScene = roleScene;
                res.send(roleItemChoose);
            });
        });
    })
    .post('/api/roleItemChooses', function (req, res, next) {
        RoleScene.getById(req.body.sceneId, function (err, roleScene) {
            roleScene.count += 1;
            roleScene.save(function (err, roleScene) {
                RoleItem.getAllByFilters({filter: {'roleScene': roleScene._id}}, function (err, roleItems) {
                    var index = Math.floor(Math.random() * roleItems.length);
                    var randomItem = roleItems[index];
                    var roleItemChoose = new RoleItemChoose({
                        key: req.body.key,
                        roleItem: randomItem._id
                    });
                    roleItemChoose.save(function (err, roleItemChoose) {
                        if (err)
                            return res.status(500).send(err);
                        res.send(roleItemChoose._id);
                    });
                });
            });
        });
    })
    .put('/api/roleItemChooses/:id', jwtAuth, function (req, res, next) {
        var modify = req.body;
        RoleItemChoose.update2(req.params.id, modify, function (err) {
            if (err)
                return res.status(500).send(err);
            res.sendStatus(200);
        });
    })
    .delete('/api/roleItemChooses/:id', jwtAuth, function (req, res, next) {
        RoleItemChoose.delete(req.params.id, function (err) {
            if (err)
                return res.status(500).send(err);
            res.sendStatus(200);
        });
    });

module.exports = router;