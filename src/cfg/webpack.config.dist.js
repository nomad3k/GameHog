let path = require('path');
let webpack = require('webpack');
// let BowerWebpackPlugin = require('bower-webpack-plugin');

module.exports = {
  entry: [
    path.join(__dirname, '../client/index.jsx')
  ],
  output: {
    path: path.join(__dirname, '../../dist/content/bundle'),
    filename: 'client.js',
    publicPath: '/assets/'
  },
  cache: false,
  devtool: 'sourcemap',
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    // new BowerWebpackPlugin({
    //   searchResolveModulesDirectories: false
    // }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        loader: 'babel-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
      },
      {
        test: /\.(png|jpg|gif|woff|woff2)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.(mp4|ogg|svg)$/,
        loader: 'file-loader'
      }
    ]
  }
};
