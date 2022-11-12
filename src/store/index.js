import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: '',
    userInfo: '', // 登录用户信息
    menu: [], // 所有菜单
    userMenu: [] // 用户菜单
  },
  getters: {},
  mutations: {
    // 保存token
    changeToken(state, token) {
      state.token = token
    }
  },
  actions: {
    // 获取所有菜单
    // 页面刷新，重新获取localStorage数据
    loadLocalLogin({ commit }) {
      const token = localStorage.getItem('token')
      // 获取token
      if (token) {
        commit('changeToken', token)
      }
    }
  },
  modules: {}
})

// 页面刷新重新获取数据
export function setupStore() {
  store.dispatch('loadLocalLogin')
}

export default store
