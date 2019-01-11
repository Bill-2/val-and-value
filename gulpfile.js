// 定义路径
var Src = './src/',
    Dist = './dist/',
    File = Dist + '**/*.*';

// 引入插件
var gulp = require('gulp'),                          //基础库
    sass = require('gulp-sass'),                     //编译sass
    browserSync = require("browser-sync").create(),         //自动刷新
    autoprefixer = require('gulp-autoprefixer'),     //自动补齐前缀
    minifycss = require('gulp-minify-css'),          //压缩css
    rename = require('gulp-rename'),                 //重命名
    concat = require('gulp-concat'),                 //合并文件
    notify = require('gulp-notify'),                 //提示
    plumber = require('gulp-plumber');               //捕获处理任务中的错误

//编译 Sass 文件
gulp.task('sass', function () {
    gulp.src(Src + 'scss/**/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
            cascade: true, // beautify or not , defalut:true , like this :
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            //remove: true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(rename({suffix: '.min'}))
        // .pipe(concat('act.min.css'))
        .pipe(minifycss())
        .pipe(gulp.dest(Dist + 'css'))
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
});

//监听事件
gulp.task('watch', function () {
    browserSync.init({
        server: {
            baseDir: Dist
        },
        open: "external",
        notify: false
    });
    gulp.watch(Src + 'scss/**/*.scss', function () {
        gulp.run('sass');
    });
    gulp.watch(File).on("change", browserSync.reload);
});

