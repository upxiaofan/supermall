module.exports = {
  // 配置别名
  configureWebpack: {
    resolve: {
      //路径别名
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        // 'router': '@/router', /*坑：千万不要配router的别名哇*/
        'views':'@/views'
      }
    }

  }

}
