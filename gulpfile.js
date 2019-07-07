'use strict';

// /////////////////////////////////
const gulp = require('gulp'),
  sass = require('gulp-sass'), // Подключаем Sass пакет
  browserSync = require('browser-sync'), // Подключаем Browser Sync
  concat = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
  uglify = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
  cssnano = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
  rename = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
  del = require('del'), // Подключаем библиотеку для удаления файлов и папок
  imagemin = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
  pngquant = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
  cache = require('gulp-cache'), // Подключаем библиотеку кеширования
  autoprefixer = require('gulp-autoprefixer'), // Подключаем библиотеку для автоматического добавления префиксов
  jsonFormat = require('gulp-json-format');


gulp.task('sass', () => // Создаем таск "sass"
     gulp.src('app/sass/**/*.scss') // Берем источник
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // префиксер
        .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({ stream: true })) // Обновляем CSS на странице при изменении
);


gulp.task('browser-sync', () => { // Создаем таск browser-sync
  browserSync({ // Выполняем browserSync
    server: { // Определяем параметры сервера
      baseDir: 'app', // Директория для сервера - app
    },
    notify: false, // Отключаем уведомления
  });
});

gulp.task('clean', gulp.series(() => {
  const myvar = del.sync('var');
  return new Promise((resolve) => resolve(myvar));
  // Удаляем папку dist перед сборкой
}));

gulp.task('img', () =>
     gulp.src('app/img/**/*') // Берем все изображения из app
        // .pipe(cache(imagemin({ // С кешированием
        .pipe(imagemin({ // Сжимаем изображения без кеширования
            interlaced: true,
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()]
        }))/**/
        .pipe(gulp.dest('dist/img')) // Выгружаем на продакшен
);


gulp.task('buildCss', () => gulp.src([ // Переносим библиотеки в продакшен
        'app/css/main.css',
        'app/css/libs.min.css'
    ])
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css')));

gulp.task('buildFonts', () => gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
        .pipe(gulp.dest('fonts')));
gulp.task('buildJs', () => gulp.src('app/js/**/*') // Переносим скрипты в продакшен
        .pipe(gulp.dest('js')));
gulp.task('buildHtml', () => gulp.src('app/*.html') // Переносим HTML в продакшен
        .pipe(gulp.dest('dist')));

gulp.task('prebuild', gulp.series('buildCss', 'buildFonts', 'buildJs', 'buildHtml'));

gulp.task('clear', (callback) => cache.clearAll());

gulp.task('createjson', () => gulp.src('app/data/*.json')
        .pipe(jsonFormat(4))
        .pipe(gulp.dest('dist/data')));

gulp.task('scripts', () => 
     gulp.src([ // Берем все необходимые библиотеки
        // 'app/libs/jquery/dist/jquery.min.js', // Берем jQuery
        'app/libs/my-libs/*.js'// Берем Magnific Popup
    ])
        .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('app/js')) // Выгружаем в папку app/js
);

gulp.task('code', () => gulp.src('app/*.html')
        .pipe(browserSync.reload({ stream: true })));

gulp.task('css-libs', gulp.series('sass', () => 
     gulp.src([
        'app/css/libs.css',
    ]) // Выбираем файл для минификации
        .pipe(concat('libs.min.css'))
        .pipe(cssnano()) // Сжимаем
        .pipe(gulp.dest('app/css')) // Выгружаем в папку app/css
));


gulp.task('watch', () => {
  gulp.watch('app/sass/**/*.scss', gulp.parallel('sass')); // Наблюдение за sass файлами
  gulp.watch('app/*.html', gulp.parallel('code')); // Наблюдение за HTML файлами в корне проекта
  gulp.watch(['app/js/common.js', 'app/libs/**/*.js'], gulp.parallel('scripts')); // Наблюдение за главным JS файлом и за библиотеками
});
gulp.task('default', gulp.parallel('css-libs', 'sass', 'createjson', 'scripts', 'browser-sync', 'watch'));

gulp.task('build', gulp.parallel('css-libs', 'prebuild', 'clean', 'img', 'sass', 'createjson', 'scripts'));

gulp.task('my', gulpDefault());

function gulpDefault() {
  return gulp.parallel('css-libs', 'sass', 'createjson', 'scripts', 'browser-sync', 'watch');
}

module.exports = gulpDefault;

