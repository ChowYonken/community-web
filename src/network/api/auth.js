import request from '../request'

// 登录
export function login(account, password) {
  return request({
    url: '/login',
    method: 'post',
    data: {
      account,
      password
    }
  })
}

// 注册
export function register(account, password) {
  return request({
    url: '/register',
    method: 'post',
    data: { account, password }
  })
}

// 退出登录
export function logout() {
  return request({
    url: '/logout'
  })
}

// 修改密码
export function updatePwd(oldPwd, newPwd) {
  return request({
    url: '/updatePwd',
    method: 'post',
    data: { oldPwd, newPwd }
  })
}
