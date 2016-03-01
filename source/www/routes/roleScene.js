var express = require('express'),
    router = express.Router(),
    RoleScene = require('../models/roleScene'),
    jwtAuth = require('../config/jwtAuth.js');

router
    .get('/api/roleScenes', function (req, res, next) {
        var options = {
            sortBy: {displayOrder:1},
            page: req.query.page - 1,
            count: req.query.count
        };
        RoleScene.list(options, function (err, roleScenes) {
            if (err)
                return res.status(500).send(err);
            RoleScene.count({}, function (err, total) {
                if (err)
                    return res.status(500).send(err);
                res.send({
                    rows: roleScenes,
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
    .get('/api/roleScenes/all', function (req, res, next) {
        var options = {
            filter: {enabled: true},
            sortBy: {displayOrder:1}
        };
        if(req.query.fields){
            options.fields = req.query.fields.split(',').join(' ');
        }
        RoleScene.getAllByFilters(options, function (err, roleScenes) {
            if (err)
                return res.status(500).send(err);
            res.send(roleScenes);
        });
    })
    .get('/api/roleScenes/:id', function (req, res, next) {
        RoleScene.getById(req.params.id, function (err, roleScene) {
            if (err)
                return res.status(500).send(err);
            res.send(roleScene);
        });
    })
    .post('/api/roleScenes', jwtAuth, function (req, res, next) {
        var roleScene = new RoleScene(req.body);
        roleScene.save(function (err) {
            if (err)
                return res.status(500).send(err);
            res.sendStatus(200);
        });
    })
    .put('/api/roleScenes/:id', jwtAuth, function (req, res, next) {
        var modify = req.body;
        RoleScene.update2(req.params.id, modify, function (err) {
            if (err)
                return res.status(500).send(err);
            res.sendStatus(200);
        });
    })
    .delete('/api/roleScenes/:id', jwtAuth, function (req, res, next) {
        RoleScene.delete(req.params.id, function (err) {
            if (err)
                return res.status(500).send(err);
            res.sendStatus(200);
        });
    });

module.exports = router;