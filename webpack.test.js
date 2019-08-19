const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require('clean-webpack-plugin');
var CompressionPlugin = require('compression-webpack-plugin');

const handler = (percentage, message, ...args) => {
  // e.g. Output each progress message directly to the console:
  console.info(percentage, message, ...args);
};

module.exports = merge(common, {
  mode: "production",
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.ProgressPlugin(handler),
    new CompressionPlugin({
      filename: '[path].br[query]',
      algorithm: 'brotliCompress',
      test: /\.(js|css|html|svg)$/,
      compressionOptions: { level: 11 },
      threshold: 10240,
      minRatio: 0.8,
      deleteOriginalAssets: false
    })
  ],
  output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].[chunkhash].bundle.js',
		chunkFilename: '[name].[chunkhash].bundle.js'
	},
});
