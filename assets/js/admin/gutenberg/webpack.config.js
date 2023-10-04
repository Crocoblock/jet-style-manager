const path    = require( 'path' );
const webpack = require( 'webpack' );

module.exports = {
	name: 'jet-style-manager-gutenberg',
	context: path.resolve( __dirname, 'src' ),
	entry: {
		'jet-sm-gb': './main.js',
	},
	output: {
		path: path.resolve( __dirname ),
		filename: '[name].js',
	},
	devtool: 'source-map',
	resolve: {
		modules: [
			'node_modules',
		],
		extensions: [ '.js' ],
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
		],
	},
};
