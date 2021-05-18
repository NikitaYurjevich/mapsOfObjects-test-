const gulp = require("gulp");
const plumber = require("gulp-plumber");
// const sourcemap = require("gulp-sourcemaps");
const sass= require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
//const { notify } = require("browser-sync");
const server = require("browser-sync").create();

const style = () => {
    return gulp.src("source/sass/style.scss")
    .pipe(plumber())
//     .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
//    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("source/css"))
    .pipe(server.stream());
}

const serve = () => {
    server.init({
        server: './source',
        notify: false,
        open: true,
        cors: true,
        ui: false,
    });

    gulp.watch("source/sass/**/*.{scss, sass}", style);
    gulp.watch("source/*.html").on("change", server.reload);
}

exports.style = style;
exports.serve = serve;

