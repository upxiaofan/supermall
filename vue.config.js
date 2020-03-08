module.exports = {
  // 配置别名
  configureWebpack: {
    resolve: {
      // extensions: [],
      //路径别名
      alias: {
        '@': 'src',
        'assert': '@/asset',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'router': '@/router',
        'views':'@/views',
      }
    }

  }

}