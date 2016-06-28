var path = require('path');
var HWP = require('html-webpack-plugin');
var ETP = require('extract-text-webpack-plugin');
var webpack = require('webpack');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH,'./lib/');
var BUILD_PATH = path.resolve(ROOT_PATH,'./build');

var APP_IN = path.resolve(APP_PATH,'app');


var ETPCSS = new ETP('[name].[chunkhash:8].css');
// var ETPSASS = new ETP('stylesheets/scss.[chunkhash:8].css');
// var ETPLESS = new ETP('stylesheets/less.[chunkhash:8].css');

module.exports = {
	entry: {
		APP_IN
	},
	output: {
		path: __dirname,
    	// publicPath: BUILD_PATH,
    	filename: 'bundle.js',
		// filename: '[name].[chunkhash:8].bundle.js',
		// chunkFilename: "[id].[chunkhash:8].bundle.js"
	},
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
		loaders: [
			{
				test: /\.css$/,
				loader: ETPCSS.extract('style','css'),
				exclude: /node_modules/,
				include: APP_PATH
			},
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
			{
				test: /\.(png|jpg)$/,
				loader: 'url?limit=40000',
				include: APP_PATH
			},
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
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: ['jquery','react'],
		// 	minChunks: Infinity
		// }),
		// new webpack.optimize.UglifyJsPlugin({
		// 	compress: {
		// 		warnings: false
		// 	}
		// }),
		// new HWP({
		// 	title: 'xxx app'
		// }),
		// ETPSASS,
		// ETPLESS,
		ETPCSS
	]
};






/*
module.exports = {
	// entry: ['./src/app1.js','./src/app2.js'],
	// entry: {
	// 	page1: "./src/page1",
	// 	page2: ['./src/app1.js','./src/app2.js']
	// },
	entry: [
		'webpack-dev-server/client?http://localhost:3333',
		'webpack/hot/only-dev-server',
		'./src/index'
	],
	output: {
    	// publicPath: '/lib/build/',
		path: path.join(__dirname,'bin'),
		filename: 'bundle.js'
		// filename: '[name].bundle.js',
		// chunkFilename: "[id].bundle.js"
	},
	resolve: {
		extensions: ['','.js','.jsx']
	},
	module: {
		loaders:[{
			test: /\.js$/,
			loaders: ['babel'],
			// loaders: ['react-hot','babel'],
			exclude: /node_modules/,
			include: path.join(__dirname, 'src'),
		},{
			test: /\.jsx$/,
			loaders: ['babel'],
			// loaders: ['react-hot','babel'],
			exclude: /node_modules/,
			include: path.join(__dirname, 'src'),
			// loader: 'babel-loader',
		},{
			test: /\.less$/,
			exclude: /node_modules/,
			include: path.join(__dirname, 'src'),
			loader: 'style-loader!css-loader!autoprefixer-loader!less-loader'
		}]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
			},
			output: {
				comments: false,
			}
		}),
		new webpack.HotModuleReplacementPlugin(),
		// new webpack.NoErrorsPlugin(),
	]
};
*/