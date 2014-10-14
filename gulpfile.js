var gulp = require('gulp');

const ASSETS = 'assets/**/*';
const STATIC = 'static/**/*';
const DIR_BUILD = 'build/';
const STYLE_FILES = 'style/**/*.less';
const STYLE_SOURCE = 'style/main.less';
const STYLE_DEST = 'assets/style/';
const STYLE_INCLUDES = ['bower_components/bootstrap/less/'];
const BOOTSTRAP_FONTS = 'bower_components/bootstrap/fonts/*';
const FONTS_DEST = 'assets/fonts/';
const SCRIPTS_DEST = 'assets/scripts/';
const BOWER_COMPONENTS = 'bower_components/**/*';

gulp.task('build', function (done) {
	var run = require('run-sequence');
	run('clean', 'copy', 'compile', 'dist', done);
});

gulp.task('clean', function (done) {
	var del = require('del');
	del(DIR_BUILD, done);
});

gulp.task('compile', ['less', 'scripts']);

gulp.task('copy', function () {
	return gulp.src(BOOTSTRAP_FONTS)
		.pipe(gulp.dest(FONTS_DEST));
});

gulp.task('dist', function () {
	gulp.src([ASSETS, STATIC])
		.pipe(gulp.dest(DIR_BUILD));
	gulp.src(BOWER_COMPONENTS, { base: './' })
		.pipe(gulp.dest(DIR_BUILD));
});

gulp.task('less', function () {
	var less = require('gulp-less');
	var config = {
		paths: STYLE_INCLUDES
	};
	return gulp.src(STYLE_SOURCE)
		.pipe(less(config))
		.pipe(gulp.dest(STYLE_DEST));
});

gulp.task('scripts', function (done) {
	var requirejs = require('requirejs');
	var config = require('./scripts/config');
	config.name = 'config';
	config.dir = SCRIPTS_DEST;
	requirejs.optimize(config, function () {
		done();
	}, function (err) {
		done(err);
	});
});

gulp.task('watch:less', ['less'], function () {
	return gulp.watch(STYLE_FILES, ['less']);
});

gulp.task('default', ['build']);