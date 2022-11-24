import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { setupStore } from './store'
import '@/assets/css/base.css'

// 引入iconfont库
import './assets/iconfont/iconfont.css'
import './assets/iconfont/iconfont.js'

import element from './components/element'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(element)

Vue.config.productionTip = false

setupStore()

new Vue({
  store,
  router,
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this //安装 全局事件总线 this指向vue原型
  }
}).$mount('#app')
