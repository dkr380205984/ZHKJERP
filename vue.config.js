module.exports = {
  devServer: {
    host: '0.0.0.0',
    port: 2234,
    https: false,
    proxy: {
      '/api': {
        target: 'http://auth.tlkrzf.com', // 对应自己的接口
        changeOrigin: true,
        ws: true
      }
    }
  }
}
