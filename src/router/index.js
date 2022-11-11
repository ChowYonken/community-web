import Router from 'vue-router'

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

export default router
