import path from 'path';
import config from 'config';
let webpack = require('webpack');
let BowerWebpackPlugin = require('bower-webpack-plugin');

module.exports = {
  entry: [
    `webpack-dev-server/client?http://127.0.0.1:${config.port}`,
    'webpack/hot/only-dev-server',
    path.join(__dirname, '../client/index.jsx')
  ],
  output: {
    publicPath: '/bundle',
    filename: 'client.js'
  },
  cache: true,
  devtool: 'eval-source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    })
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
