/**
 * 开发模式下的webpack配置
 */

const path = require('path');
const webpack = require('webpack');

module.exports = {
	devtool : 'cheap-module-eval-source-map',

	entry : [
		'webpack-hot-middleware/client?reload=true',
		path.resolve(__dirname,'src/main.js')
	],

	output : {
		filename : 'bundle.js',
		path : path.join(__dirname,'dist'),
		publicPath : 'http://localhost:3000/'
	},
	resolve : {
		extensions : ['','.js']
	},
	module : {
		loaders : [
			{ test: /\.vue$/,loader:'vue'}
			{ test: /\.css$/,loaders : 'style-loader!css-loader'},
			{ test: /\.less$/,loaders : 'c'},
			{ test: /\.(png|jpg)$/, loader : 'url-loader?limit=8192' },
		    { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loader : 'file-loader' }
		]
	},
	plugins : [
		new webpack.ProvidePlugin({
			$ : "jquery",
			jQuery : 'jquery',
			"window.jQuery" : "jquery"
		}),
		// new ExtractTextPlugin("css/[name].css"),
		// new Html
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	]
}