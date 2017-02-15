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

elixir.config.assetsPath = 'src';
elixir.config.publicPath = 'dist';

elixir(function(mix) {

    mix.scripts([
        '../ImageSize.js',
        '../ImageSizer.js',
        '../after.js',
    ], 'dist/ImageSizer.js');

    mix.webpack('app.js');
});
