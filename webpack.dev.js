const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require("webpack");
const path = require("path");
const ASSET_PATH = process.env.ASSET_PATH || '/';
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = merge(common, {
  mode: "development",
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH)
    }),
    new BundleAnalyzerPlugin()
  ],
  devServer: {
    port: 4001,
    historyApiFallback: true,
    inline: true,
    hot: true,
    proxy: {
      '/api/*': 'http://localhost:3000',
      '/s3/*': 'http://localhost:8080'
    },
    overlay: {
      errors: true
    },
    publicPath: '',
    contentBase: './'
  },
  output: {
    filename: '[name].[hash].js',
    publicPath: ASSET_PATH
  },
});
