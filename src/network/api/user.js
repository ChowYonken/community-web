import request from '../request'

// 获取登录用户信息
export function getUserInfo() {
  return request({
    url: '/login/user'
  })
}
