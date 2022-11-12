import Router from 'vue-router'

import { Message } from 'element-ui'

const Login = () => import('@/view/auth/login')
const Main = () => import('@/view/main/main')
const NotFound = () => import('@/view/not-found/not-found')

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
    path: '/:patchMatch(.*)*',
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
})

export default router
