const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        components: '@/components',
        view: '@/view',
        router: '@/router',
        assets: '@/assets',
        network: '@/network',
        store: '@store'
      }
    }
  }
})
