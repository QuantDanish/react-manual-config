const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	entry: {
		app: ['./src/index.js'],
	},

	resolve: {
		extensions: ['.js', '.jsx', '.scss', '.css'],
	},

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js',
		publicPath: '/',
	},

	optimization: {
		minimize: true,
		splitChunks: {
			chunks: 'all',
		},
	},

	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: '/node_modules/',
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.(c|sc|sa)ss$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(png|jpg|jpeg|gif)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10000,
							name: 'assets/images/[name].[ext]',
						},
					},
				],
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg|)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'assets/fonts/',
						},
					},
				],
			},
		],
	},

	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].[hash].css',
			chunkFilename: '[id].[hash].css',
		}),
		new HtmlWebpackPlugin({
			template: './src/index.html',
			favicon: './src/favicon.ico',
		}),
	],

	devServer: {
		historyApiFallback: true,
	},
};
