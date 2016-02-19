"use strict";
var gulp = require("gulp"),
    runSequence = require('run-sequence').use(gulp);

/**
 * gulp default
 */
gulp.task("default", function () {
    runSequence(
        ['dev'],
        ['nodemon'],
        ['watch', 'browser-sync']
    );
});