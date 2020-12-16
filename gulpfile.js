let gulp         = require("gulp"),
    sass         = require("gulp-sass"),
    watch        = require("gulp-watch"),
    rigger       = require("gulp-rigger"),
    preFixer     = require("gulp-autoprefixer"),
    browserSync  = require('browser-sync'),
    del          = require('del'),
    cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglifyjs'),
    imagemin     = require('gulp-imagemin'),
    pngquant     = require('imagemin-pngquant'),
    cache        = require('gulp-cache'),
    reload       = browserSync.reload;

// пути к файлам
var path = {
    production: {  // куда будет складывать готовые файлы после зборки
        resources: 'production/resources/',
        html: 'production/',
        js: 'production/',
        scss: 'production/',
        jsLibs: "production/",
        cssLibs: "production/",
        fonts: "production/",
    },
    src: {
        resScss: "src/resources/*.scss",
        resJs: "src/resources/*.js",
        html: "src/**/*.html",
        js: "src/**/js/*.js",
        scss: "src/**/css/main.scss",
        jsLibs: "src/**/js/libs/**/*.js",
        cssLibs: "src/**/css/libs/**/*.css",
        fonts: "src/**/fonts/**/*.woff"
    },
    watch: {  //  пути к файлам, за которыми будем следить
        resScss: "src/resources/*.scss",
        resJs: "src/resources/*.js",
        html: "src/**/*.html",
        js: "src/**/*.js",
        scss: "src/**/*.scss",
        jsLibs: "src/**/js/libs/**/*.js",
        cssLibs: "src/**/css/libs/**/*.css",
        fonts: "src/**/fonts/**/*.woff"
    }
};

// Static server
gulp.task('webserver', function() {
    browserSync.init({ // Выполняем browserSync
        server:{ // Определяем параметры сервера
            baseDir:'./production' // Директория для сервера
        },
        notify: false // Отключаем уведомления
    })
});


// сборка файлов
// сборка html
gulp.task("html:production", function() {
    return gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.production.html))
        .pipe(reload({stream: true}));
});

// сборка js
gulp.task("js:production", function() {
    return gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(gulp.dest(path.production.js))
        .pipe(reload({stream: true}));
});

// сборка resources js
gulp.task("resJs:production", function() {
    return gulp.src(path.src.resJs)
        .pipe(rigger())
        .pipe(gulp.dest(path.production.resources))
        .pipe(reload({stream: true}));
});

// сборка fonts
gulp.task("fonts:production", function() {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.production.fonts))
        .pipe(reload({stream: true}));
});

// сборка scss
gulp.task("scss:production", function() {
    return gulp.src(path.src.scss)
        .pipe(sass())
        .pipe(preFixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest(path.production.scss))
        .pipe(reload({stream: true}));
});

// сборка resources scss
gulp.task("resScss:production", function() {
    return gulp.src(path.src.resScss)
        .pipe(sass())
        .pipe(preFixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest(path.production.resources))
        .pipe(reload({stream: true}));
});

// сборка css-библиотек
gulp.task("cssLibs:production", function() {
    return gulp.src(path.src.cssLibs)
        .pipe(gulp.dest(path.production.cssLibs)) // Выгружаем в папку production/css
        .pipe(reload({stream: true})); // Обновляем css на странице при изменении
});

// сборка js-библиотек
gulp.task("jsLibs:production", function() {
    return gulp.src(path.src.jsLibs)
        .pipe(gulp.dest(path.production.jsLibs)) // Выгружаем в папку production/js как есть
        .pipe(reload({stream: true})); // Обновляем js на странице при изменении
});

// таск для сборки
gulp.task("production",
    gulp.parallel(
        "resJs:production",
        "resScss:production",
        "html:production",
        "scss:production",
        "js:production",
        "fonts:production",
        "cssLibs:production",
        "jsLibs:production"
    )
);

// сборка js-библиотек
gulp.task("js.min", function() {
    return gulp.src(path.src.jsLibs)
        .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest(path.production.jsLibs)) // Выгружаем в папку production/js
});

gulp.task("css.min", function() {
    return gulp.src(path.src.cssLibs)
        .pipe(cssnano()) // Сжимаем
        .pipe(gulp.dest(path.production.cssLibs)) // Выгружаем в папку production/css
        .pipe(concat('libs.min.css')) // Собираем их в кучу в новом файле libs.min.css
        .pipe(gulp.dest(path.production.cssLibs)) // Выгружаем в папку production/css
        .pipe(reload({stream: true})); // Обновляем css на странице при изменении
});

// оптимизация изображений
gulp.task('img', function (){ // оптимизация изображений
    return gulp.src('src/**/img/**/*')
    /*.pipe(cache(imagemin({
        intelaced: true,
        progressiveLazyLoad:true,
        svgPlugins:[{removeViewBox: false}],
        use: [pngquant()]
    })))*/
        .pipe(gulp.dest('production/'));
});



// следим за изменениями
gulp.task('watch' , function () {
    gulp.watch([path.watch.scss], { usePolling: true }, gulp.parallel('scss:production'));
    gulp.watch([path.watch.resScss], { usePolling: true }, gulp.parallel('resScss:production'));
    gulp.watch([path.watch.resJs], { usePolling: true }, gulp.parallel('resJs:production'));
    gulp.watch([path.watch.html], { usePolling: true }, gulp.parallel('html:production'));
    gulp.watch([path.watch.fonts], { usePolling: true }, gulp.parallel('fonts:production'));
    gulp.watch([path.watch.js], { usePolling: true }, gulp.parallel('js:production'));
    gulp.watch([path.watch.jsLibs], { usePolling: true }, gulp.parallel('jsLibs:production'));
    gulp.watch([path.watch.cssLibs], { usePolling: true }, gulp.parallel('cssLibs:production'));
    gulp.watch('src/img/**/*', { usePolling: true }, gulp.parallel('img'));
});


// чистим папку production
gulp.task('clean', async function() {
    return del.sync('production'); // Удаляем папку production перед сборкой
});


// дефолтный таск
gulp.task('default', gulp.parallel("clean","img","production","webserver","watch"));