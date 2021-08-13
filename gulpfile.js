const gulp = require("gulp");
const minify = require("gulp-minify");
const concat = require('gulp-concat');

function minifyJs() {
    return gulp.src(['src/classes/*.js','src/main.js'])
    .pipe(minify({noSource: true}))
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist/js'))
}

function moveAssets() {
    return gulp.src(['assets/images/intro_background.png'])
    .pipe(gulp.dest('dist/assets/images'))
}

gulp.task('dist', gulp.series(minifyJs,moveAssets));