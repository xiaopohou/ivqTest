var express = require('express'),
    router = express.Router(),
    RoleItem = require('../models/roleItem'),
    jwtAuth = require('../config/jwtAuth.js');

router
    .get('/api/roleItems', function (req, res, next) {
        var options = {
            sortBy: {displayOrder:1},
            page: req.query.page - 1,
            count: req.query.count
        };
        RoleItem.list(options, function (err, roleItems) {
            if (err)
                return res.status(500).send(err);
            RoleItem.count({}, function (err, total) {
                if (err)
                    return res.status(500).send(err);
                res.send({
                    rows: roleItems,
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
    .get('/api/roleItems/:id', function (req, res, next) {
        RoleItem.getById(req.params.id, function (err, roleTest) {
            if (err)
                return res.status(500).send(err);
            res.send(roleTest);
        });
    })
    .post('/api/roleItems', jwtAuth, function (req, res, next) {
        var roleTest = new RoleItem(req.body);
        roleTest.save(function (err) {
            if (err)
                return res.status(500).send(err);
            res.sendStatus(200);
        });
    })
    .put('/api/roleItems/:id', jwtAuth, function (req, res, next) {
        var modify = req.body;
        RoleItem.update2(req.params.id, modify, function (err) {
            if (err)
                return res.status(500).send(err);
            res.sendStatus(200);
        });
    })
    .delete('/api/roleItems/:id', jwtAuth, function (req, res, next) {
        RoleItem.delete(req.params.id, function (err) {
            if (err)
                return res.status(500).send(err);
            res.sendStatus(200);
        });
    });

module.exports = router;