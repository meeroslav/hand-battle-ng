var less = require('gulp-less');
var lazyPipe = require('lazypipe');
var gif = require('gulp-if');

function stringEndsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function isLessFile(file) {
    return stringEndsWith(file.relative, 'less');
}

var styleTransforms = lazyPipe().pipe(function() {
    return gif(isLessFile, less());
});

module.exports = {
    bundle: {
        'scripts/bundle': {
            scripts: [
                './bower_components/angular/angular.min.js',
                './bower_components/angular-animate/angular-animate.min.js',
                './bower_components/angular-resource/angular-resource.min.js',
                './bower_components/angular-touch/angular-touch.min.js',
                './bower_components/angular-sanitize/angular-sanitize.min.js',
                './bower_components/angular-ui-router/release/angular-ui-router.min.js',
                './bower_components/i18next/i18next.min.js',
                './bower_components/ng-i18next/dist/ng-i18next.min.js',
                // load everything from scripts folder
                './app/scripts/app.js',
                './app/scripts/*/*.js'
            ],
            options: {
                uglify: 'production'
            }                        
        },
        'styles/bundle': {
            styles: [
                './app/styles/*.less',
                './app/styles/device_specific/*.less'
            ],
            options: {
                transforms: {
                    styles: styleTransforms
                },
                minCSS: 'production'
            }
        }
    },
    copy: [
        {
            src: './app/styles/fonts/*.*',
            base: './app/'
        },
        {
            src: './app/images/*.*',
            base: './app/'
        },
        {
            src: './app/locales/**/*.*',
            base: './app/'
        },      
        {
            src: './app/views/*.*',
            base:'./app/'
        },     
        {
            src: './app/index.html',
            base:'./app/'
        }
    ]
};