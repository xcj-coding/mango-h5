var path = require('path');
var webpack = require('webpack');
var HWP = require('html-webpack-plugin');
var ETP = require('extract-text-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH,'lib');
var APP_IN = path.resolve(APP_PATH,'app.js');
// var CSS_PATH = path.resolve(ROOT_PATH,'css');
var BUILD_PATH = path.resolve(ROOT_PATH,'build');


// var ETPCSS = new ETP('[name].css?v=[chunkhash:8]');
// var ETPSASS = new ETP('stylesheets/scss.[chunkhash:8].css');
// var ETPLESS = new ETP('stylesheets/less.[chunkhash:8].css');

var commonsPlugins = new webpack.optimize.CommonsChunkPlugin('module.js?v=[hash:8]');

module.exports = {
	entry: {
		app: [APP_IN],
		// css: [CSS_PATH]
	},
	output: {
		path: BUILD_PATH,
    	// publicPath: 'http://mycdn.com/',
    	filename: '[name].js?v=[chunkhash:8]',
    	// filename: '[name].bundle.js?v=[chunkhash:8]',
		// chunkFilename: "[id].[chunkhash:8].bundle.js"
	},
	devtool: 'inline-source-map',
	debug: true,
	resolve: {
		alias: {
      		'redux-devtools': path.resolve(__dirname, '..', '..', 'lib'),
			'react': path.resolve(ROOT_PATH, 'node_modules', 'react')
		}
	},
	resolveLoader: {
	  'fallback': path.resolve(__dirname, 'node_modules')
	},
	devServer: {
		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true
	},
	module: {
		// preLoaders: [
		// 	{
		// 		test: /\.(jsx|js)$/,
		// 		exclude: /node_modules/,
		// 		loader: 'eslint-loader'
		// 	}
		// ],
		loaders: [
			// {
			// 	test: /\.css$/,
			// 	loader: ETPCSS.extract('style','css'),
			// 	exclude: /node_modules/,
			// 	include: CSS_PATH
			// },
			// {
			// 	test: /\.scss$/,
			// 	loader: ETPSASS.extract("style", "css!sass"),
			// 	exclude: /node_modules/,
			// 	include: APP_PATH
			// },
			// {
			// 	test: /\.less$/,
			// 	loader: ETPLESS.extract("style", "css!less"),
			// 	exclude: /node_modules/,
			// 	include: APP_PATH
			// },
			// {
			// 	test: /\.(png|jpg)$/,
			// 	loader: 'url?limit=40000',
			// 	include: APP_PATH
			// },
			// {
			// 	test: /\.(jsx|js)$/,
			// 	loader: 'babel',
			// 	exclude: /node_modules/,
			// 	include: APP_PATH
			// },
			{
				test: /\.js$/,
				// loaders: ['react-hot', 'babel'],
				loader: 'babel',
                query: {
                    presets: ['es2015-loose', 'stage-0', 'react']
                },
				exclude: /node_modules/,
				include: path.join(__dirname, 'lib')
			},
			{
				test: /\.js$/,
				// loaders: ['react-hot', 'babel'],
				loader: 'babel',
                query: {
                    presets: ['es2015-loose', 'stage-0', 'react']
                },
				include: path.join(__dirname, '..', '..', 'lib')
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		commonsPlugins,
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("development")
			}
		}),
		// new webpack.optimize.UglifyJsPlugin({
		// compress: {
		// 	warnings: false,
		// },
		// output: {
		// 	comments: false,
		// }
		// }),
		// new HWP({
		// 	title: 'xxx app'
		// }),
		// new webpack.NoErrorsPlugin(),
		// ETPSASS,
		// ETPLESS,
		// ETPCSS
	]
};
