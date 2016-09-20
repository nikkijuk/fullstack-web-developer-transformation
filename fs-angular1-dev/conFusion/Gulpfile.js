// reserved own line for each initialitation -- lot cleaner so
var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var uglify = require('gulp-uglify');
var usemin = require('gulp-usemin');
var imagemin = require('gulp-imagemin');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var cache = require('gulp-cache');
var changed = require('gulp-changed');
var rev = require('gulp-rev');
var browserSync = require('browser-sync');
var del = require('del');
var ngannotate = require('gulp-ng-annotate');

// check code
gulp.task('jshint', function() {
	return gulp.src('app/scripts/**/*.js')
			   .pipe(jshint())
			   .pipe(jshint.reporter(stylish));
});

// Clean
gulp.task('clean', function() {
	return del([ 'dist' ]);
});

gulp.task('usemin', [ 'jshint' ], function() {
	return gulp.src('./app/menu.html')
	 		   .pipe(usemin({css : [ minifycss(), rev() ], js : [ uglify(), rev() ]	}))
	 		   .pipe(gulp.dest('dist/'));
});

// Images
gulp.task('imagemin', function() {
	return del([ 'dist/images' ]), 
			gulp.src('app/images/**/*')
			.pipe(cache(imagemin({
				optimizationLevel : 3,
				progressive : true,
				interlaced : true
			})))
			.pipe(gulp.dest('dist/images'))
			.pipe(notify({message : 'Images task complete'}));
});

gulp.task('copyfonts',[ 'clean' ],	function() {
					gulp.src('./bower_components/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')
					    .pipe(gulp.dest('./dist/fonts'));
					gulp.src('./bower_components/bootstrap/dist/fonts/**/*.{ttf,woff,eof,svg}*')
						.pipe(gulp.dest('./dist/fonts'));
				});

// Watch
gulp.task('watch', [ 'browser-sync' ], function() {
	// Watch .js files
	gulp.watch('{app/scripts/**/*.js,app/styles/**/*.css,app/**/*.html}',
			[ 'usemin' ]);
	// Watch image files
	gulp.watch('app/images/**/*', [ 'imagemin' ]);

});

// sync
gulp.task('browser-sync', [ 'default' ], function() {
	var files = [ 'app/**/*.html', 'app/styles/**/*.css',
			'app/images/**/*.png', 'app/scripts/**/*.js', 'dist/**/*' ];

	browserSync.init(files, {
		server : {
			baseDir : "dist",
			index : "menu.html"
		}
	});
	// Watch any files in dist/, reload on change
	gulp.watch([ 'dist/**' ]).on('change', browserSync.reload);
});

gulp.task('usemin',['jshint'], function () {
	  return gulp.src('./app/menu.html')
	    .pipe(usemin({
	      css:[minifycss(),rev()],
	      js: [ngannotate(),uglify(),rev()]
	    }))
	    
	    .pipe(gulp.dest('dist/'));
	});

// default at the end of file

// Default task
gulp.task('default', [ 'clean' ], function() {
	gulp.start('usemin', 'imagemin', 'copyfonts');
});