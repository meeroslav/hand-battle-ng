var gulp = require('gulp');
var del = require('del');
var bundle = require('gulp-bundle-assets');
var inject = require('gulp-inject');
var liveReload = require('gulp-livereload');

// Clean bin folder
gulp.task('clean', function(cb){
   del(['bin/**'], cb); 
});    

// Bundle files
gulp.task('bundle', ['clean'], function() {
    process.env.NODE_ENV = process.argv.indexOf('prod') !== -1 ? 'production' : 'staging';

    return gulp.src('./bundle.config.js')
        .pipe(bundle({quietMode: true}))
        .pipe(gulp.dest('./bin/'));
});

// Deploy files
gulp.task('deploy', ['bundle'], function () {
    var target = gulp.src('./bin/index.html');
    var bundles = gulp.src(['./bin/scripts/bundle*.js', './bin/styles/bundle*.css'], {read: false});
    var configs = gulp.src('./app/configuration/*.json');

    return target
        .pipe(inject(bundles, {relative: true}))
        .pipe(inject(configs, {
            starttag: '<!-- inject: configs -->',
            transform: function(filepath, file) {
                var id = file.path.slice(file.base.length).replace(".json","Config");
                return '<script type="text/javascript">\nangular.module("HandBattle.Config", [])' +
                        '\n.constant("' + id + '",' + 
                        file.contents.toString('utf8') + 
                        ');\n</script>';                
            }
        }))
        .pipe(gulp.dest('./bin/'));
});

// Watch files
gulp.task('watch', function() {
    liveReload.listen();
    gulp.watch('./app/**', ['deploy']);
});
    
gulp.task('default', ['deploy']);