var webpack = require('webpack')
module.exports = {
	entry :'./src/index.js',
	output : {
		path : './dist',
		filename : 'index.js'
	},
  module: {
       loaders: [
           // => .css 文件应用  "style" 和 "css" loader
           { test: /\.css$/, loader: "style!css" },
           // => .less 文件应用  "style" 和 "css" loader
           { test: /\.less$/, loader: "style!css!less" },
           // => url-loader 配置  mimetype=image/png 参数
          //  {
          //      test: /\.png$/,
          //      loader: "url-loader?mimetype=image/png"
          //  },
       ]
   }
}
