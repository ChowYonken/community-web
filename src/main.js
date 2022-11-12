import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Router from 'vue-router'
import '@/assets/css/base.css'

// 引入iconfont库
import './assets/iconfont/iconfont.css'
import './assets/iconfont/iconfont.js'

import element from './components/element'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(element)

Vue.config.productionTip = false

Vue.use(Router)

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
