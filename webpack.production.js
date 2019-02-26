const config = require('config');
const path = require('path');
const postcssPlugins = require('./postcss.plugins');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: [
    './src/index.js'
  ],
  output: {
    filename: 'app.bundle.js',
    path: path.join(__dirname, 'dist/static'),
    publicPath: '/'
  },
  externals: {
    config: '__CONFIG__'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              localIdentName: config.css.localIdentName,
              camelCase: true,
              modules: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => postcssPlugins
            }
          }
        ]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        DEVELOPMENT: false
      }
    })
  ]
};
