var path = require('path');
var webpack = require('webpack');
var ETP = require('extract-text-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH,'lib');
var APP_IN = path.resolve(APP_PATH,'app.js');
var CSS_PATH = path.resolve(ROOT_PATH,'css/my.css');
var BUILD_PATH = path.resolve(ROOT_PATH,'build');

var ETPCSS = new ETP('[name].css?v=[chunkhash:8]');

module.exports = {
    entry: {
        app: [APP_IN],
        css: [CSS_PATH],
        module:[
          'react',
          'react-dom',
          'react-router',
          'redux',
          'react-redux',
          'redux-thunk',
          'immutable',
          'history'
        ],
    },
    devtool:false,
    output: {
        path: BUILD_PATH,
        filename: '[name].min.js?v=[chunkhash:8]',
        library: ['Example', '[name]'],
        pathInfo: true,
        chunkFilename: "[id].min.js?v=[chunkhash:8]"
    },
    resolve: {
        root: APP_PATH,
        extensions: ['', '.js','.json','.jsx'],
        modulesDirectories: ['node_modules', './lib/component/']
    },
    module: {
        loaders: [
          {
            test: /\.css$/,
            loader: ETPCSS.extract('style','css'),
            exclude: /node_modules/,
            include: CSS_PATH
          },
          {
            test: /\.js|jsx$/,
            loader: 'babel',
            exclude: /node_modules/,
            include: path.join(__dirname, 'lib')
          }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('module', 'module.min.js?v=[chunkhash:8]'),
        new webpack.DefinePlugin({'process.env.NODE_ENV': '"production"'}),
        ETPCSS
    ]
};




