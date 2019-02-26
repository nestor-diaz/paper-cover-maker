module.exports = function renderHtml() {
  const appBundle = isDev() ? '/assets/app.dev.bundle.js' : '/assets/app.bundle.js';

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <base href="/" />
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link href="https://fonts.googleapis.com/css?family=Lusitana" rel="stylesheet">
        <title>Paper Title maker</title>
      </head>
      <body>
        <noscript>
          You need to enable JavaScript to run this app.
        </noscript>
        <div id="root">{{SSR}}</div>
        <script type="text/javascript">
          window.__CONFIG__ = {{CONFIG}};
          window.__DATA = {{DATA}};
        </script>
        <script src="${appBundle}"></script>
      </body>
    </html>
  `;
};
