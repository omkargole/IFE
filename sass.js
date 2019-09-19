var gulp = require('gulp');
function sass() {
    return gulp.src('./sass/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
}
exports.sass = sass;
