var webpack = require('webpack')

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
      app:'./src/main.js'
  },
  output: {
    path: './dist',
    publicPath: '/',
    filename: 'build.js'
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file?name=img/[name].[ext]?[hash]'
      },{
        test :/\.css$/,
        loader : ExtractTextPlugin.extract("style-loader","css-loader")
      
      },{
        test: /\.less$/,
        loader: ExtractTextPlugin.extract("style-loader","css-loader!less-loader")
      },
      {
          test: /\.(eot|svg|ttf|woff|woff2)\w*/,
          loader: 'file?name=css/font/[name].[ext]?[hash]'
      }
    ]
  },
  // example: if you wish to apply custom babel options
  // instead of using vue-loader's default:
  // babel: {
  //   presets: ['es2015', 'stage-0'],
  //   plugins: ['transform-runtime']
  // },
  vue:{
        loaders : {
            css:ExtractTextPlugin.extract("css")  ,
            less: ExtractTextPlugin.extract("css!less")
        }
    },
    
  plugins : [
      new webpack.ProvidePlugin({
            $: "jquery",
            jQuery : "jquery",
            "window.jQuery" : "jquery"
        }),
        new ExtractTextPlugin("css/[name].css"),
        new HtmlWebpackPlugin({
            filename : 'index.html',
            template : 'index.html',
            inject : true,
            hash : true,
            minify : {
                removeComments : true,
                collapseWhitespace : false
            }
        })
    ]
}

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
   
  ]
} else {
  module.exports.devtool = '#source-map'
}