'use strict';

let path = require('path');
let webpack = require('webpack');
let autoprefixer = require('autoprefixer');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

const join = dest => path.resolve(__dirname, dest);
const web  = dest => join('web/static/' + dest);

const env = process.env.MIX_ENV || 'dev';
const prod = env === 'prod';
const publicPath = 'http://localhost:4001/';
const hot = `webpack-hot-middleware/client?path=${publicPath}__webpack_hmr`;
const entry = [web('js/app.js'), web('css/app.css')];

let plugins = [
  new ExtractTextPlugin('css/app.min.css'),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    __PROD: prod,
    __DEV: env === 'dev'
  }),
  new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
];

let config = {
  // entry: [web('js/app.js'), web('css/app.css')],
  entry: prod ? entry : ['react-hot-loader/patch', ...entry, hot],
  devtool: prod ? null : 'cheap-module-eval-source-map',

  output: {
    path: join('priv/static/js'),
    filename: 'app.js',
    publicPath
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

  plugins,

  postcss() {
    return [autoprefixer];
  }
};

if (env === 'dev') {
  plugins.push(new webpack.HotModuleReplacementPlugin());
}

if (prod) {
  config.plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({ minimize: true })
  );
}

module.exports = config;
