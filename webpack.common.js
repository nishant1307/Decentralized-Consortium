const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const devMode = process.env.NODE_ENV !== 'production'
const VENDOR_LIBS = ['react', 'react-dom'];
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
  entry: {
		bundle: './src/index.js',
		vendor: VENDOR_LIBS
	},
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /^.\/wordlists\/(?!english)/,
      contextRegExp: /bip39\/src/
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/
    }),
    new CopyPlugin([
      { from: './src/WA/js', to: 'js' },
      { from: './src/WA/images', to: 'images' }
    ]),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: "./public/favicon.png"
    })
  ],
  optimization: {
    splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendor",
            chunks: "all",
          },
        },
      },
		runtimeChunk: true
	},
  performance: {
    hints: 'warning'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: ["babel-loader", "eslint-loader"]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg|gif)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, 'src')],
    extensions: ["*", ".js", ".jsx"]
  },
};
