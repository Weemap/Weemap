const gulp = require('gulp');
const fs = require('fs');
const fileinclude = require('gulp-file-include');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');

const pages = fs.readdirSync('pages')
    .filter(f => !f.includes('.'));

function processHomeRootTask() {
    return gulp.src('pages/index.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./build/')); 
}
    
function html() {
    const list = []

    for (const folder of pages) {
        const taskFunction = function () {
            return gulp.src(`pages/${folder}/*.html`)
                .pipe(fileinclude({
                    prefix: '@@',
                    basepath: '@file'
                }))
                .pipe(gulp.dest(`./build/${folder}`))
        };

        Object.defineProperty(taskFunction, 'name', { 
            value: `processHTML_${folder}`, 
            writable: false
        });
        
        list.push(taskFunction);
    }

    return list
}

function css() {
    const list = []

    for (const folder of pages) {
        const taskFunction = function () {
            return gulp.src(`pages/${folder}/*.css`)
                .pipe(concat('styles.css'))
                .pipe(cleanCSS({ compatibility: 'ie8' }))
                .pipe(gulp.dest(`./build/${folder}`))
        };

        Object.defineProperty(taskFunction, 'name', { 
            value: `processCSS_${folder}`, 
            writable: false
        });
        
        list.push(taskFunction);
    }
    
    return list
}

function assets() {
    const srcDir = 'assets';
    const destDir = 'build/assets';
    
    fs.cpSync(srcDir, destDir, { recursive: true }, err => {
        if (err !== null) {
            console.error(`Erro ao copiar ${srcDir} para ${destDir}:`, err);
            throw err;
        }
    })

    return Promise.resolve();
}

exports.build = gulp.parallel(
    html(), 
    css(), 
    assets, 
    processHomeRootTask);

exports.default = exports.build;