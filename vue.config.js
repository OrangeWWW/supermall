module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'components': '@/components',
        'commonjs': '@/commonjs',
        'content': 'components/content',
        'common': 'components/common',
        'assets': '@/assets',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}
