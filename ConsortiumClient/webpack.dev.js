const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require("webpack");
const path = require("path");
const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = merge(common, {
  mode: "development",
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH)
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname),
    port: 4001,
    historyApiFallback: true,
    inline: true,
    hot: true,
    proxy: {
      '/api/*': 'http://localhost:8080',
      '/s3/*': 'http://localhost:8080'
    },
    overlay: {
      warnings: true,
      errors: true
    },
    publicPath: '',
    contentBase: './',
  },
  output: {
    filename: '[name].[hash].js',
    publicPath: ASSET_PATH
  },
});
