var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');
new WebpackDevServer(webpack(config),{
  publicPath: config.output.publicPath,
  hot: true,
  noInfo: false,
  historyApiFallback: true,
  stats: {
    colors: true
  }
}).listen(8888, 'localhost', function(err){
  if(err){
    console.log(err);
  }
  console.log('*******************************');
});
