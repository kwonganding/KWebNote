const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true, //默认false，是否需要转译的第三方依赖
  publicPath: '/zfadmin/', //基本url，多用于指定子路径
})
