var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');
config.entry.app.unshift("webpack-dev-server/client?http://localhost:8888/","webpack/hot/dev-server");
new WebpackDevServer(webpack(config),{
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
