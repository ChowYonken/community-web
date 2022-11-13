import Vuex from 'vuex'
import Vue from 'vue'

import { getMenuList } from '@/network/api/menu'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: '',
    userInfo: {}, // 登录用户信息
    menu: [], // 所有菜单
    userMenu: [] // 用户菜单
  },
  getters: {},
  mutations: {
    // 保存token
    changeToken(state, token) {
      state.token = token
    },
    // 保存登录用户信息
    changeUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    // 保存用户菜单
    changeUserMenu(state, userMenu) {
      state.userMenu = userMenu
    },
    // 保存所有菜单
    changeAllMenu(state, menu) {
      state.menu = menu
    }
  },
  actions: {
    // 获取所有菜单
    async _getMenuList({ commit }) {
      const result = await getMenuList()
      const menu = result.data.data
      commit('changeAllMenu', menu)
    },

    // 页面刷新，重新获取localStorage数据
    loadLocalLogin({ commit, dispatch }) {
      // 获取token
      const token = localStorage.getItem('token')
      if (token) {
        commit('changeToken', token)
        // 获取完整菜单
        dispatch('_getMenuList')
      }
      // 获取用户信息
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      // 获取用户菜单
      const userMenu = JSON.parse(localStorage.getItem('userMenu'))
      if (userMenu) {
        commit('changeUserMenu', userMenu)
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
