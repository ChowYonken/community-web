const user = () => import('@/views/main/manage/user/user.vue')
export default {
  path: '/main/manage/user',
  name: 'user',
  component: user,
  children: []
}
