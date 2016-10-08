var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
	entry :'./src/index.js',
	output : {
		path : './dist',
		filename : 'index.js'
	},
  module: {
       loaders: [
           // => .css 文件应用  "style" 和 "css" loader
           // { test: /\.css$/, loader: "style!css" },
           { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
           
           // => .less 文件应用  "style" 和 "css" loader
           // { test: /\.less$/, loader: "style!css!less" },
           { test: /\.less$/, loader: ExtractTextPlugin.extract("style-loader", "css!less") },
           // => url-loader 配置  mimetype=image/png 参数
           {
               test: /\.png$/,
               loader: "url-loader?mimetype=image/png"
           }
       ]
  },
  plugins : [
    new ExtractTextPlugin("[name].css")
  ]
}
