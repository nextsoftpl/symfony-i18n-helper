var gulp = require('gulp');
var excel2json = require('gulp-excel2json');
var jsonfile = require('jsonfile');
var util = require('util');
var _ = require('underscore');
var MessageXML = require('./messageXML').MessageXML;

gulp.task('copy', function() {
    gulp.src('**.xlsx')
        .pipe(excel2json({
            headRow: 1,
            valueRowStart: 3,
            trace: true
        }))
        .pipe(gulp.dest('build'));
});

gulp.task('convert', function(){

    var transl = {};

    var file = 'build/input.xlsx';
    jsonfile.readFile(file, function(err, obj) {

        _.each(obj, function(element, source){
            _.each(element, function(target, lang){
                if(!transl[lang]){
                    transl[lang] = {};
                }
                transl[lang][source] = target;
            });
        });

        _.each(transl, function(rows,lang){
            var messageXML = new MessageXML(lang, rows);
        })

    });

});