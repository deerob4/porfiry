'use strict';

let path              = require('path');
let webpack           = require('webpack');
let autoprefixer      = require('autoprefixer');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

const join = dest => path.resolve(__dirname, dest);
const web  = dest => join('web/static/' + dest);

let config = {
  entry: {
    application: [
      web('css/app.css'),
      web('js/app.js')
    ]
  },

  output: {
    path: join('priv/static'),
    filename: 'js/app.min.js'
  },

  resolve: {
    alias: {
      constants: web('js/constants/index.js'),
      components: web('js/components'),
      containers: web('js/containers'),
      reducers: web('js/reducers'),
      actions: web('js/actions'),
      layouts: web('js/layouts'),
      styles: web('js/styles'),
      views: web('js/views'),
      utils: web('js/utils'),
      phoenix: __dirname + '/deps/phoenix/web/static/js/phoenix.js'
    },
    extensions: ['', '.js', '.css'],
    modulesDirectories: ['node_modules']
  },

  module: {
    noParse: /vendor\/phoenix/,
    loaders: [
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: ['react', 'es2015', 'stage-0']
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(['css', 'postcss'])
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('css/app.min.css')
  ],

  postcss() {
    return [autoprefixer];
  }
};

if (process.env.MIX_ENV === 'prod') {
  config.plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({ minimize: true })
  );
}

module.exports = config;
