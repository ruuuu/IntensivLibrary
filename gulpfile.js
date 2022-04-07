// пакеты берем отсюда https://www.npmjs.com/package/package
// чтобы в ком строке запускать через gulp, то надо утсанвоить глобальное gulp: npm i gulp-cli -g 
// gulp

import gulp from 'gulp';
import gulpif from 'gulp-if';
import browserSync from 'browser-sync';
import plumber from 'gulp-plumber';
import del from 'del';
import rename from 'gulp-rename';

//html

import htmlMin from 'gulp-htmlmin';

// css

import sass from 'sass'; // sass -движок котрый обрбатывает less/scss файлы
import gulpSass from 'gulp-sass';
const scssToCss = gulpSass(sass);

import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import gcmq from 'gulp-group-css-media-queries';
import {
    stream as critical
} from 'critical';


// js

import webpack from 'webpack-stream';
import terser from 'gulp-terser';

// image
import gulpImage from 'gulp-image';
import gulpWebp from 'gulp-webp'; // для сжатия картинок
import gulpAvif from 'gulp-avif'; // для сжатия картинок


// server


let dev = false; //  по умолчанию прод среда

const path = { // пути до файлов
    src: {
        base: 'src/',
        html: 'src/*.html',
        scss: 'src/scss/**/*.scss',
        js: 'src/js/index.js',
        img: 'src/img/**/*.{jpg,svg,jpeg,png,gif}',
        imgF: 'src/img/**/*.{jpg,jpeg,png}',
        assets: ['src/fonts/**/*.*', 'src/icons/**/*.*'],
    },
    dist: {
        base: 'dist/',
        html: 'dist/',
        css: 'dist/css/',
        js: 'dist/js/',
        img: 'dist/img/',

    },
    watch: {
        html: 'src/*.html',
        scss: 'src/scss/**/*.scss',
        js: 'src/js/**/*.*',
        img: 'src/img/**/*.{jpg,svg,jpeg,png,gif}',
        imgF: 'src/img/**/*.{jpg,jpeg,png}',

    }
};


export const html = () => gulp // task html
    .src(path.src.html) // берем все html файлы
    .pipe(gulpif(!dev, htmlMin({ // подчищаем их, если прод, то минимизирует файлы
        removeComments: true,
        collapseWhitespace: true,
    })))
    .pipe(gulp.dest(path.dist.html)) //html  файлы кладет в паку dist методом dest
    .pipe(browserSync.stream()); //  изменять без  преезагрузки страницы



export const scss = () => gulp // task scss
    .src(path.src.scss) // берем файлы scss  из папки src
    .pipe(gulpif(dev, sourcemaps.init())) //если dev, то создаем карту для него
    .pipe(scssToCss().on('error', scssToCss.logError)) // если из scss не получилось собрать css, то выкинет ошибку в кнсоль
    .pipe(gulpif(!dev, autoprefixer(({ // если это прод, то 
        cascade: false,
    }))))
    .pipe(gulpif(!dev, gcmq())) // если прод
    .pipe(gulpif(!dev, gulp.dest(path.dist.css))) // чтобы проверить что положилось  в css
    .pipe(gulpif(!dev, cleanCSS({ // сжимаем(минимизируем)
        2: {
            specialComments: 0,
        }
    })))
    .pipe(rename({ suffix: '.min' })) // перименовываем файл , суффкс min
    .pipe(gulpif(dev, sourcemaps.write()))
    .pipe(gulp.dest(path.dist.css))
    .pipe(browserSync.stream());


const configWebpack = {
    mode: dev ? 'development' : 'production', // какая разрботка dev/prod
    devtool: dev ? 'eval-source-map' : false,
    optimization: {
        minimize: false,
    },
    output: {
        filename: 'index.js' // выходной файл
    },
    module: {
        rules: []
    }
};



if (!dev) { // если сборка prod
    configWebpack.module.rules.push({ // берем все js файлы
        test: /\.(js|ts)$/, // $ значит конец названия файла
        exclude: /(node_modules)/, // исчклбчаем папку node_modules
        loader: 'babel-loader', // babel- транскомпилятор  котрый прогоняет код  в старых браузерах
        options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
        }
    });
}


export const js = () => gulp
    .src(path.src.js) // берем этот файл для обработки
    .pipe(plumber()) // чтоб при ошибке в коде,gulp не отваливался
    .pipe(webpack(configWebpack)) // запсукамем вебпак
    .pipe(gulpif(!dev, gulp.dest(path.dist.js))) // готовый файл  положим в  папку js
    .pipe(gulpif(!dev, terser())) // минифицируем файл
    .pipe(rename({ // переименовывем с перфиксом min
        suffix: '.min',
    }))
    .pipe(gulpif(!dev, gulp.dest(path.dist.js)))
    .pipe(gulp.dest(path.dist.js)) // полодим папку js в папку dist
    .pipe(browserSync.stream());


const image = () => gulp
    .src(path.src.img) // брем все файлы из img
    .pipe(gulpif(!dev, gulpImage({ // если прод, тогда минифицирем картинки
        optipng: ['-i 1', '-strip all', '-fix', '-o7', '-force'],
        pngquant: ['--speed=1', '--force', 256],
        zopflipng: ['-y', '--lossy_8bit', '--lossy_transparent'],
        jpegRecompress: ['--strip', '--quality', 'medium', '--min', 40, '--max', 80],
        mozjpeg: ['-optimize', '-progressive'],
        gifsicle: ['--optimize'],
        svgo: ['--enable', 'cleanupIDs', '--disable', 'convertColors']
    })))
    .pipe(gulp.dest(path.dist.img)) // положили папку img(сжатую) в папку dist
    .pipe(browserSync.stream({ // чтоб  при добавлении новой картинки, остальне картинки  не перерендировались
        once: true,
    })
    );


const webp = () => gulp
    .src(path.src.imgF)
    .pipe(gulpWebp({
        quality: dev ? 100 : 70 // для dev качество 100%, для прода  70%
    }))
    .pipe(gulp.dest(path.dist.img))
    .pipe(browserSync.stream({
        once: true,
    })
    );


export const avif = () => gulp
    .src(path.src.imgF)
    .pipe(gulpAvif({
        quality: dev ? 100 : 50
    }))
    .pipe(gulp.dest(path.dist.img))
    .pipe(browserSync.stream({
        once: true,
    })
    );


export const copy = () => gulp
    .src(path.src.assets, {
        base: path.dist.base,
    })
    .pipe(gulp.dest(path.dist.base))
    .pipe(browserSync.stream({
        once: true,
    })
    );


export const server = () => { //
    browserSync.init({
        ui: false,
        notify: false,
        host: 'localhost',
        tunnel: true, // если с телефона нужно зайти по урлу localhost при запущенносм gulp
        server: {
            baseDir: path.dist.base, // базовая диреткория
        }
    });

    gulp.watch(path.watch.html, html); // следит за этими файлами
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.img, image);
    gulp.watch(path.watch.imgF, gulp.parallel(webp, avif));
    gulp.watch(path.src.assets, copy);
};


export const clear = () => del(path.dist.base, { //  каждый раз когда собираем проект, очищаем папку dist, эту функицю запускаем в build  
    force: true,
});


const develop = (ready) => {
    dev = true;
    ready();
};


const base = gulp.parallel(html, scss, js, image, avif, webp, copy); // таски запускаются параллельно


export const build = gulp.series(clear, base); // для прода, спрва вызовется таска html, потом base

export default gulp.series(develop, base, server); // сперва вызовется таски develop, потом base,  потм server

