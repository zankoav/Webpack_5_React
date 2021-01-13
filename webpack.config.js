const path = require('path');
const {CleanWebpackPlugin}  = require('clean-webpack-plugin');
const AssetsPlugin = require("assets-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');



module.exports = {
  	entry: {
		main_desktop: path.resolve(__dirname, 'assets/desktop/main.js'),
		main_mobile: path.resolve(__dirname, 'assets/mobile/main.js')
	},
  	output: {
		path: path.resolve(__dirname, 'src'),
		filename: 'js/[name].[hash:6].min.js',
		publicPath: "/src/"
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							"@babel/preset-env",
							"@babel/preset-react"
						]
					}
				}
			},
			{
				test: /\.(sa|sc|c)ss$/i,
				use: [
				  MiniCssExtractPlugin.loader,
				  "css-loader",
				  "sass-loader",
				],
			},
			{
				test: /\.pug$/,
				loader: "pug-loader",
				options: {
					pretty: true
				}
			},
            {
                test: /\.(jpg|png|svg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: './img/',
                            name: '[name].[hash:6].[ext]'
                        }
                    }
                ]
            }
		]
	},
	plugins:[
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[hash:6].css',
		}),
		new HtmlWebpackPlugin({
            filename: "main_desktop.html",	
			title:'Main Desktop',
			inject: 'body',
			publicPath: "/src/",
			minify:false,
			chunks:['main_desktop'],
            template: path.resolve(__dirname, 'assets/desktop/main.pug')
        }),
		new HtmlWebpackPlugin({
            filename: "main_mobile.html",	
			title:'Main Mobile',
			inject: 'body',
			publicPath: "/src/",
			minify:false,
			chunks:['main_mobile'],
            template: path.resolve(__dirname, 'assets/mobile/main.pug')
        }),
		new AssetsPlugin({
			filename: 'assets.json',
			prettyPrint: true,
			path: path.resolve(__dirname, 'src')
		}),
        new webpack.DefinePlugin({
            DEBUG_MODE: true
		}),
		new webpack.ProvidePlugin({
            "React": "react",
        }),
	],
	resolve: {
		extensions: ['*', '.js', '.jsx'],
		alias: {
			img: path.join(__dirname, 'assets/img'),
			c: path.join(__dirname, 'assets/components')
		}
	}
};