import request from '../request'

export function getNoticeLit(offset, limit) {
  return request({
    url: '/main/notice/list',
    method: 'post',
    data: { offset, limit }
  })
}
