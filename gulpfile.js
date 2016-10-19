//载入组件 －－ test 未使用 －－
var gulp = require("gulp"),
	concat = require("gulp-concat"),
	rename = require("gulp-rename"),
	minift = require("gulp-minify-css"),
	cssmin = require("gulp-clean-css"),
	imageisux = require("gulp-imageisux"),
	notify = require("gulp-notify");

gulp.task('imageisux', function() {
    gulp.src(['i/*'])
		.pipe(imageisux('/dest/',true))
		.pipe(notify({ message: '图片压缩完成'}));
});

gulp.task('css-concat-min', function() {
	gulp.src(['./css/common.css','./css/holiday.css'])
	    .pipe(gulp.dest('build'))
	    .pipe(concat("build.css"))
	    .pipe(cssmin())
	    .pipe(rename({
	      suffix:".min"
	    }))
	    .pipe(gulp.dest('build'))
	    .pipe(notify({ message: 'css合并压缩完成'}));
});

gulp.task("img",function(){
	gulp.start("imageisux");
});

gulp.task("css",function(){
	gulp.start("css-concat-min");
});

gulp.task("default",function(){
	gulp.start("imageisux");
	gulp.start("css-concat-min");
});
