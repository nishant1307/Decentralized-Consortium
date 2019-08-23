const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require("path");
const webpack = require("webpack");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
// var CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const DynamicCdnWebpackPlugin = require('dynamic-cdn-webpack-plugin');
const ASSET_PATH = process.env.ASSET_PATH || '/';
const handler = (percentage, message, ...args) => {
  // e.g. Output each progress message directly to the console:
  console.info(percentage);
};
module.exports = merge(common, {
  mode: "production",
  optimization: {
    minimizer: [
      new TerserPlugin(),
      new OptimizeCSSAssetsPlugin({

      })
    ]
	},
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH)
    }),
    new webpack.ProgressPlugin(handler),
    // new CompressionPlugin({
    //   filename: '[path].br[query]',
    //   algorithm: 'brotliCompress',
    //   test: /\.(js|css|html|svg)$/,
    //   compressionOptions: { level: 11 },
    //   threshold: 10240,
    //   minRatio: 0.8,
    //   deleteOriginalAssets: false
    // }),
    new DynamicCdnWebpackPlugin()
  ],
  output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].[chunkhash].bundle.js',
		chunkFilename: '[name].[chunkhash].bundle.js',
    publicPath: ASSET_PATH
	},
});
