const App = require('~/App').default;
const React = require('react');
const config = require('config');
const httpCodes = require('http-status-codes');
const renderHtml = require('./html');
const url = require('url');
const { StaticRouter } = require('react-router');
const { renderToString } = require('react-dom/server');

module.exports = function renderer(req, res) {
  const location = url.parse(req.url);
  const context = {};

  const markup = renderToString(
    <StaticRouter location={location} context={context}>
      <App />
    </StaticRouter>
  );

  if (context.url) {
    return res.redirect(httpCodes.MOVED_PERMANENTLY, context.url);
  }

  const responseHtml = renderHtml()
    .replace('{{CONFIG}}', JSON.stringify(config.clientConfig))
    .replace('{{SSR}}', markup);

  return res.status(context.code || httpCodes.OK).send(responseHtml);
};
