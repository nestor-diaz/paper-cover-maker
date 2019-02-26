import path from 'path';
import webpack from 'webpack';
import config from 'config';
import postcssPlugins from './postcss.plugins';

module.exports = {
  mode: 'development',
  entry: [
    'webpack-hot-middleware/client',
    './src/index.js'
  ],
  output: {
    filename: 'app.dev.bundle.js',
    path: '/assets',
    publicPath: '/assets'
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
        exclude: /node_modules/,
        options: {
          cacheDirectory: true,
          plugins: ['react-hot-loader/babel']
        },
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        DEVELOPMENT: true
      }
    })
  ]
};
