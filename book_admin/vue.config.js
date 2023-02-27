const { defineConfig } = require('@vue/cli-service')


module.exports = defineConfig({
  //默认false，是否需要转译的第三方依赖
  transpileDependencies: true,

  //基本url，多用于指定子路径，同process.env.BASE_URL
  publicPath: "/kwebnote/",

  devServer: {
    proxy: {
      '/server': { //用 “/api” 代理 “http://localhost:8081”
        target: 'http://localhost:3000', //代理的目标
        changeOrigin: true,
        ws: true,
        pathRewrite: { '^/server': '' }
      }
    }
  },

  configureWebpack: config => {
    config.optimization = {
      splitChunks: {                 // 开启分离js
        chunks: "all",               //async异步代码分割 initial同步代码分割 all同步异步分割都开启
        minSize: 30000,           //字节 引入的文件大于30kb才进行分割
        automaticNameDelimiter: '-', //缓存组和生成文件名称之间的连接符
        // name: true,               //缓存组里面的filename生效，覆盖默认命名
        cacheGroups: {               //按组件模块分割
          "element-ui": {
            name: 'eu',
            test: /[\\/]node_modules[\\/]element-ui[\\/]/,
            priority: -10
          },
          "vue": {
            name: 'vue',
            test: /[\\/]node_modules[\\/]vue[\\/]/,
            priority: -10
          },
          "axios": {
            name: 'axios',
            test: /[\\/]node_modules[\\/]axios[\\/]/,
            priority: -10
          },
          "dayjs": {
            name: 'dayjs',
            test: /[\\/]node_modules[\\/]dayjs[\\/]/,
            priority: -10
          },
          "echarts": {
            name: 'echarts',
            test: /[\\/]node_modules[\\/]echarts[\\/]/,
            priority: -10
          },
        }
      }
    };
  },

  pluginOptions: {
    i18n: {
      locale: 'zh',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
      enableBridge: false
    }
  }
})


