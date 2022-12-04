import request from '../request'

// 疑似人员列表
export function getSuspectedList(offset, limit) {
  return request({
    url: '/main/user/suspected/list',
    method: 'post',
    data: { offset, limit }
  })
}

// 疑似人员总数
export function getSuspectedTotal() {
  return request({
    url: '/main/user/suspected/total',
    method: 'get'
  })
}
