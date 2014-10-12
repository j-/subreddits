var gulp = require('gulp');

const STYLE_FILES = 'style/*.less';
const STYLE_SOURCE = 'style/main.less';
const STYLE_DEST = 'assets/style/';
const STYLE_INCLUDES = ['bower_components/bootstrap/less/'];

gulp.task('less', function () {
	var less = require('gulp-less');
	var config = {
		paths: STYLE_INCLUDES
	};
	return gulp.src(STYLE_FILES)
		.pipe(less(config))
		.pipe(gulp.dest(STYLE_DEST));
});

gulp.task('watch:less', ['less'], function () {
	gulp.watch(STYLE_SOURCE, ['less']);
});