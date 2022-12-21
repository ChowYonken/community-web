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

// 获取体温范围数量
export function getTempCounts() {
  return request({
    url: '/main/temp/counts'
  })
}

// 查询设备好坏数量
export function getDeviceCounts() {
  return request({
    url: '/main/device/counts'
  })
}
