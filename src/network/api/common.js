import request from '../request'

export function getHealthCodeCounts() {
  return request({
    url: '/main/healthCode/counts'
  })
}
