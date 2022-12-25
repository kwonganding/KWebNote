const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true, //默认false，是否需要转译的第三方依赖
  publicPath: '/bookadmin/', //基本url，多用于指定子路径
  devServer: {
    proxy: {
      '/api': { //用 “/api” 代理 “http://localhost:8081”
        target: 'http://localhost:8081', //代理的目标
        changeOrigin: true,
        ws: true,
        pathRewrite: { '^/api': '' }
      }
    }
  }
})
