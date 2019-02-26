const compression = require('compression');
const config = require('config');
const express = require('express');
const renderer = require('./renderer');

const app = express();
const router = express.Router();

if (isDev()) {
  const webpack = require('webpack');
  const webpackDevConfig = require('../webpack.development');
  const compiler = webpack(webpackDevConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: webpackDevConfig.output.publicPath,
    noInfo: true,
    reload: true
  }));

  app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
    noInfo: true,
    reload: true
  }));
}

app.use(compression());

app.use('/', router);
router.use('/assets', express.static(config.assets.path));
router.use((req, res) => renderer(req, res));

app.listen(config.server.port, config.server.hostname, () => {
  console.log(`Service listen on http://${config.server.hostname}:${config.server.port}`);
});

module.exports = app;
