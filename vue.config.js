module.exports = {
  devServer: {
    port: 8002,
    disableHostCheck: true,
    proxy: {
      '^/api': {
        target: 'http://stockstream:8080',
        changeOrigin: true,
      },
    },

  },
  transpileDependencies: [
    'vuetify',
  ],
};
