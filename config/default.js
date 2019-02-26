const config = {
  server: {
    hostname: '0.0.0.0',
    port: '9092',
    protocol: 'http'
  },
  assets: {
    path: 'static',
    uri: {
      protocol: 'http',
      host: '0.0.0.0:9092/assets'
    }
  }
};

const clientConfig = {};

config.clientConfig = clientConfig;

module.exports = config;
