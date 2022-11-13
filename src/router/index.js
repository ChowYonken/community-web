import Router from 'vue-router'
import Vue from 'vue'
import { firstMenu } from '@/utils/map-menus'

import { Message } from 'element-ui'

Vue.use(Router)

const Login = () =>
  import(/* webpackChunkName: "home-chunk" */ '@/view/auth/login')
const Main = () =>
  import(/* webpackChunkName: "home-chunk" */ '@/view/main/main')
const NotFound = () =>
  import(/* webpackChunkName: "home-chunk" */ '@/view/not-found/not-found')

const routes = [
  {
    path: '/',
    redirect: '/main'
  },
  // 登录
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  // 主页面
  {
    path: '/main',
    name: 'main',
    component: Main
  },
  // not-found页面
  {
    path: '*',
    name: 'notFound',
    component: NotFound
  }
]

const router = new Router({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.path !== '/login' && !token) {
    Message({
      showClose: true,
      message: '住客您好，请先登录~',
      type: 'warning'
    })
    next('/login')
  } else {
    next()
  }
  if (to.path === '/main') {
    next(firstMenu.url)
  } else {
    next()
  }
})

export default router
