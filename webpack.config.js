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
      actions: web('js/actions'),
      components: web('js/components'),
      constants: web('js/constants/index.js'),
      containers: web('js/containers'),
      layouts: web('js/layouts'),
      reducers: web('js/reducers'),
      styles: web('js/styles'),
      utils: web('js/utils'),
      views: web('js/views'),
      phoenix: join('deps/phoenix/web/static/js/phoenix.js')
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
    new ExtractTextPlugin('css/app.min.css'),
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     NODE_ENV: JSON.stringify('production')
    //   }
    // }),
    new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
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
