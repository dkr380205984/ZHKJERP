module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://api.tlkrzf.com', // 对应自己的接口
        changeOrigin: true,
        ws: true
      }
    }
  }
}
