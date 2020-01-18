//////////////////////////////////////
// ----- NEEDED GULP MODULES ----- //
////////////////////////////////////

var   gulp = require("gulp"),
        sass = require("gulp-sass"),
        autoprefixer = require("gulp-autoprefixer"),
        sourcemaps = require("gulp-sourcemaps"),
        gutil = require("gutil"),
        cleancss = require("gulp-clean-css"),
        browserify = require("browserify"),
        source = require("vinyl-source-stream"),
        buffer = require("vinyl-buffer"),
        uglify = require("gulp-uglify"),
        babel = require("gulp-babel"),
        babelify = require("babelify"),
        windowify = require("windowify"),
        plumber = require("gulp-plumber"),
        concat = require("gulp-concat");

///////////////////////////////////


///////////////////////////////////
// --- LOCATION OF SRC FILES --- //
///////////////////////////////////

var src_sass = "./sass/style.scss";
var src_js = "./js/scripts.js";

var vendor_css = [
    "./node_modules/bootstrap/dist/css/bootstrap.css"
];
var vendor_js = [
    "./lib/jquery.min.js",
    "./node_modules/bootstrap/dist/js/bootstrap.bundle.js"
];

// KO DODAJAS zazeni "GULP VENDOR"

// vendor_js.push("./lib/imagesloaded.pkgd.min.js");

///////////////////////////////////

//////////////////////////////////
// -------- GULP TASKS -------- //
/////////////////////////////////

//sass compile and minify
gulp.task("sass",function(){
    gulp.src(src_sass)
        .pipe(sourcemaps.init())
        .pipe(sass().on("error",function(err){
            gutil.log(err);
            this.emit("end");
        }))
        .pipe(autoprefixer())
        .pipe(cleancss())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest("./css/"));
});

gulp.task("js", function() {
    return browserify({
            entries: src_js,
            debug: true
        })
        .transform('windowify')
        .transform("babelify", {presets: ["env"]})
        .bundle()
        .on("error",function(err){ //browserify error handling
            gutil.log(err);
            this.emit("end");
        })
        .pipe(plumber())
        .pipe(source('scripts.min.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./js/'));
});



// concatenate and minify vendor scripts

gulp.task("vendor-js", function(){
    gulp.src(vendor_js)
        .pipe(uglify())
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest('./vendor/'));
});
gulp.task("vendor-css", function(){
    gulp.src(vendor_css)
        .pipe(cleancss())
        .pipe(concat('vendor.min.css'))
        .pipe(gulp.dest('./vendor/'));
});


/////////////////////////////////


/////////////////////////////////
// ---- WATCH SASS CHANGES ----//
/////////////////////////////////

//watch  sass changes
gulp.task("sass-watch",["sass"],function(){
    gulp.watch("sass/**/*.scss",["sass"]);
});

//watch js changes
gulp.task("js-watch", ["js"], function(){
    gulp.watch("js/**/*.js", ["js"]);
});


/////////////////////////////////


// --- DEFAULT GULP TASK --- //
gulp.task("default",["sass-watch","js-watch"]);

// create vendor scripts
gulp.task("vendor", ["vendor-js", "vendor-css"]);