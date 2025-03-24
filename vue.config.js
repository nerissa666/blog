const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,
  devServer: {
    hot: true, //热加载
    host: 'localhost',
    port: 8080, //端口
    https: false, //false关闭https，true为开启
    open: true, //自动打开浏览器
    proxy: {
      '/file': {
        target: 'http://localhost:4001',
        ws: true,
        changeOrigin: true,
        // pathRewrite: {
        //   '^/milliaApi': '/'
        // }
      },
      /*
      其他基地址，项目如对接不同基地址数据且需交互http与https，
      修改public文件夹里的index.html在head中添加
      <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
      */
      // '/MilliaOtherApi': {
      //   target: 'https://xx.xxx.xxxx/xxx',
      //   ws: true,
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/MilliaOtherApi': '/'
      //   }
      // },
    }
  },

})
