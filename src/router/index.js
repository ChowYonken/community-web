import Router from 'vue-router'
import Vue from 'vue'
import { firstMenu } from '@/utils/map-menus'

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

// 防止重复点击路由报错
const originalPush = Router.prototype.push

Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.path !== '/login' && !token) {
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
