const webpack = require("webpack");
const CompressionPlugin = require("compression-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const Environment = require("../environment");

module.exports = class extends Environment {
  constructor() {
    super();

    // this.plugins.append('ModuleConcatenation', new webpack.optimize.ModuleConcatenationPlugin())
    //
    this.plugins.append('UglifyJs', new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      exclude: [/^(?!.*\.spec\.js$).*\.js$/], // Exclude test files & snapshots
      mangle: {
        safari10: true
      },
      compress: {
        warnings: false,
        comparisons: false
      },
      output: {
        comments: false,
        ascii_only: true
      }
    }))

    this.plugins.append('Compression', new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css|html|json|ico|svg|eot|otf|ttf)$/
    }))

    this.config.merge({
      devtool: 'nosources-source-map',
      stats: 'normal'
    })
  }
};
