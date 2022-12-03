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

// 外出报备
export function addOut(start, end, startTime, endTime, transportation) {
  return request({
    url: '/main/user/out',
    method: 'post',
    data: {
      start,
      end,
      startTime,
      endTime,
      transportation
    }
  })
}

// 管理员
// 获取用户列表
export function getUserList(offset, limit) {
  return request({
    url: '/main/user/list',
    method: 'post',
    data: { offset, limit }
  })
}

// 获取用户总数
export function getUserTotal(realname, address) {
  return request({
    url: '/main/user/total',
    method: 'post',
    data: {
      realname,
      address
    }
  })
}

// 添加用户
export function addUser(account, password, realname, cellphone, address) {
  return request({
    url: '/main/user',
    method: 'post',
    data: { account, password, realname, cellphone, address }
  })
}

// 编辑用户
export function updateUser(userId, realname, cellphone, address) {
  return request({
    url: '/main/user/' + userId,
    method: 'post',
    data: { realname, cellphone, address }
  })
}

// 删除用户
export function deleteUser(userId) {
  return request({
    url: '/main/user/' + userId,
    method: 'delete'
  })
}

// 搜索用户
export function queryUser(offset, limit, realname, address) {
  return request({
    url: '/main/user/others',
    method: 'post',
    params: {
      realname,
      address
    },
    data: {
      offset,
      limit
    }
  })
}

// 设为疑似人员
export function setSuspected(userId, mode) {
  return request({
    url: '/main/user/' + userId,
    method: 'put',
    data: {
      mode
    }
  })
}
