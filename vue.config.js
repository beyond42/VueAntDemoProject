module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'https://beyond2.doc.ba',
        changeOrigin: true,
        logLevel: 'debug',
      },
    },
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  },
};
