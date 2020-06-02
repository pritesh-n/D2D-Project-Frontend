// Reference link: https://gist.github.com/jeromecoupe/0b807b0c1050647eb340360902c3203a

// Gulp vars
const { src, dest, parallel, series, watch } = require("gulp");
const argv = require("yargs").argv;
const gulpIf = require("gulp-if");
const del = require("del");
const sourcemaps = require("gulp-sourcemaps");

const browserSync = require("browser-sync");

// Misc vars
let isProduction = argv.production || false;

/**
 * Miscelleanous functions
 */
// function setProduction(cb) {
//   isProduction = true;
//   cb();
// }
function clean() {
  return del(["static/css/**/*"]);
}

/**
 * Browser sync
 */
function connectServer() {
  browserSync({
    proxy: "http://localhost:4001",
  });
}

/**
 * CSS tasks
 */
function styles() {
  const postcss = require("gulp-postcss");
  const postcssPresetEnv = require("postcss-preset-env");
  const cssnano = require("cssnano");
  const purgecss = require("gulp-purgecss");
  const postcssNormalize = require("postcss-normalize");
  const atImport = require("postcss-easy-import");
  const combineMediaQueries = require("postcss-combine-media-query");

  const postcssProcessors = [
    atImport({
      root: "./css",
      path: "./css",
    }),
    postcssNormalize({ browsers: ["defaults", "IE >= 10"] }),
    require("postcss-nested")(),
    postcssPresetEnv({
      stage: 0,

      // Removes the newer(unwanted) css code
      // once it has it's polyfill.
      preserve: false,

      browsers: ["defaults", "IE >= 10"],
      autoprefixer: isProduction,
      features: { "nesting-rules": false },
      fontFace: true,
    }),
  ];

  if (isProduction) {
    postcssProcessors.push(
      cssnano(),
      combineMediaQueries(),
      require("postcss-sort-media-queries")({
        sort: "desktop-first",
      })
      //   purgecss({
      //     content: ["**/*.php"],
      //     whitelist: purgecssWordpress.whitelist,
      //     whitelistPatterns: purgecssWordpress.whitelistPatterns,
      //   })
    );
  }

  return (
    src([
      // Ref: https://stackoverflow.com/a/35413106
      "css/**/!(_)*.css", // select all css files
      "!css/**/_*/", // exclude all folder starting with _
      "!css/**/_*/**/*", //exclude files/subfolders in folders starting with '_'
    ])
      .pipe(gulpIf(!isProduction, sourcemaps.init()))
      .pipe(
        postcss(postcssProcessors, {
          parser: require("postcss-comment"), // To handle inline comments
        })
      )
      // .pipe(gulpIf(isProduction,purgecss({
      //     content: ["**/*.php"],
      //     whitelist: purgecssWordpress.whitelist,
      //     whitelistPatterns: purgecssWordpress.whitelistPatterns,
      //   })))
      .pipe(gulpIf(!isProduction, sourcemaps.write(".")))
      .pipe(dest("static/css"))
      .pipe(gulpIf(!isProduction, browserSync.stream()))
  );
}

/**
 * Watch Task
 */

function watchFiles() {
  watch("css/**/*.css", { ignoreInitial: false }, styles);
}

/**
 * Complex Tasks
 */
const build = series(clean, parallel(styles));

// Export tasks
exports.styles = styles;
exports.clean = clean;
exports.watch = series(clean, parallel(watchFiles, connectServer));
exports.build = build;
exports.default = build;
