var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    mix.scripts( [
        './src/ImageSize.js',
        './src/ImageSizer.js',
        './src/after.js',
    ], 'dist/ImageSize.js' );

    mix.browserify( './src/app.js', 'dist/build/build.js' );
    mix.browserSync({
        files: [
            '*.html',
            'dist/**/*',
        ],
        proxy: null,
        server: './',
    });
    // mix.sass('app.scss');
});
