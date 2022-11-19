import request from '../request'

// 获取登录用户信息
export function getUserInfo() {
  return request({
    url: '/login/user'
  })
}

// 住户查询个人信息
export function queryUserInfo(userId) {
  return request({
    url: '/main/user/profile/' + userId,
    method: 'get'
  })
}

// 住户修改个人信息
export function updateUserInfo(userId, realname, cellphone, address) {
  return request({
    url: '/main/user/profile/' + userId,
    method: 'post',
    data: {
      realname,
      cellphone,
      address
    }
  })
}

// 健康申报
export function addHealth(homeTemp, status, riskAreas, healthCode, others) {
  return request({
    url: '/main/user/health',
    method: 'post',
    data: {
      homeTemp,
      status,
      riskAreas,
      healthCode,
      others
    }
  })
}
