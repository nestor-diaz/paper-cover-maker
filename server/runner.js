const cssHook = require('css-modules-require-hook');
const config = require('config');

cssHook({
  generateScopedName: config.css.localIdentName,
  camelCase: true,
  prepend: require('../postcss.plugins')
});

global.isDev = () => process.env.NODE_ENV === 'development';

require('./index');
