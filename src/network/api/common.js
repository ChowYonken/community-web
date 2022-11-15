import request from '../request'

// 获取红绿黄码数量
export function getHealthCodeCounts() {
  return request({
    url: '/main/healthCode/counts'
  })
}

// 获取最新公告
export function getNewNotice() {
  return request({
    url: '/main/notice/new'
  })
}
