const gulp = require('gulp');
const browserSync = require('browser-sync');
const rename = require('gulp-rename');
const autoPrefixer = require('gulp-autoprefixer');
const GulpCleanCss = require('gulp-clean-css');
const sass = require('gulp-sass')(require('sass'));

// Static server
gulp.task('server', () => {
    browserSync.init({
        server: {
            baseDir: 'src'
        }
    });
});

gulp.task('styles', () => {
    return gulp.src('src/sass/**/*.+(scss|sass)')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(rename({
            prefix: '',
            suffix: '.min'
        }))
        .pipe(autoPrefixer())
        .pipe(GulpCleanCss({
            compatibility: 'ie8',
        }))
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream());
});

gulp.task('watch', () => {
    gulp.watch(
        'src/sass/**/*.+(scss|sass)',
        gulp.parallel('styles')
    );

    gulp.watch('src/*.html',)
        .on('change', browserSync.reload);
})

gulp.task('default', gulp.parallel('watch', 'server', 'styles'));