const gulp = require('gulp');
const fileinclude = require('gulp-file-include');
const concat = require('gulp-concat');       // 🌟 NOVO: Para juntar arquivos
const cleanCSS = require('gulp-clean-css');

function html() {
    return gulp.src('./*.html') 
        .pipe(fileinclude({
            prefix: '@@', 
            basepath: '@file' 
        }))
        .pipe(gulp.dest('./build')); 
}

// function css() {
//     return gulp.src('**/*.css') 
//         .pipe(gulp.dest('./build/css')); 
// }

function css() {
    return gulp.src('**/*.css') 
        .pipe(concat('styles.css'))  // 1. JUNTAR: Cria um arquivo único chamado style.min.css
        .pipe(cleanCSS({compatibility: 'ie8'})) // 2. MINIFICAR: Comprime o CSS
        .pipe(gulp.dest('./build')); // 3. DESTINO: Move para dist/css
}

function assets() {
    // Pega todos os arquivos dentro da pasta src/assets/ e suas subpastas
    return gulp.src('assets/*') 
        .pipe(gulp.dest('build/assets')); 
}

exports.build = gulp.parallel(html, css, assets);

// Define a tarefa padrão (se você rodar apenas 'npm start' ou 'gulp')
exports.default = exports.build;