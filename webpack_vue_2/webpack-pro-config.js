var path = require('path');

var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry : {
		index : './src/index',
		vendor : [
			'react',
			'react-dom'
		]
	},
	output : {
		path : path.join(__dirname , 'dist'),
		publicPath : '',
		filename : 'bundle.js'
	},

	plugins : [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compressor : {
				warnings : false
			}
		}),
		new webpack.DefinePlugin({
			'process.env' : {
				'NODE_ENV' : JSON.stringify('production')
			}
		}),
		new webpack.optimize.CommonsChunkPlugin('vendor','vendor.js'),
		new HtmlWebpackPlugin({
			title : '产品模式',
			filename : 'index.html',
			template : './src/template.html',
			inject : 'body',
			chunks : ['vendor','index'],
			hash : true,
			minify: {
				removeComments : true,
				collapseWhitespace : false
			}
		})
	],
	resolve : {
		extendsions ; ['','.js']
	},
	module: {
		
	}
}