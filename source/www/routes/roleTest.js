var express = require('express'),
    router = express.Router(),
    RoleTest = require('../models/roleTest'),
    jwtAuth = require('../config/jwtAuth.js');

router
    .get('/api/roleTests', function (req, res, next) {
        var options = {
            sortBy: {displayOrder:1},
            page: req.query.page - 1,
            count: req.query.count
        };
        RoleTest.list(options, function (err, roleTests) {
            if (err)
                return res.status(500).send(err);
            RoleTest.count({}, function (err, total) {
                if (err)
                    return res.status(500).send(err);
                res.send({
                    rows: roleTests,
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
    .get('/api/roleTests/all', function (req, res, next) {
        var options = {
            filter: {enabled: true},
            sortBy: {displayOrder:1}
        };
        if(req.query.fields){
            options.fields = req.query.fields.split(',').join(' ');
        }
        RoleTest.getAllByFilters(options, function (err, roleTests) {
            if (err)
                return res.status(500).send(err);
            res.send(roleTests);
        });
    })
    .get('/api/roleTests/:id', function (req, res, next) {
        RoleTest.getById(req.params.id, function (err, roleTest) {
            if (err)
                return res.status(500).send(err);
            res.send(roleTest);
        });
    })
    .get('/api/roleTests/getByRoute/:route', function (req, res, next) {
        roleTest.getByRoute(req.params.route, function (err, category) {
            if (err)
                return res.status(500).send(err);
            res.send(category);
        });
    })
    .post('/api/roleTests', jwtAuth, function (req, res, next) {
        var roleTest = new RoleTest(req.body);
        roleTest.save(function (err) {
            if (err)
                return res.status(500).send(err);
            res.sendStatus(200);
        });
    })
    .put('/api/roleTests/:id', jwtAuth, function (req, res, next) {
        var modify = req.body;
        RoleTest.update2(req.params.id, modify, function (err) {
            if (err)
                return res.status(500).send(err);
            res.sendStatus(200);
        });
    })
    .delete('/api/roleTests/:id', jwtAuth, function (req, res, next) {
        RoleTest.delete(req.params.id, function (err) {
            if (err)
                return res.status(500).send(err);
            res.sendStatus(200);
        });
    });

module.exports = router;