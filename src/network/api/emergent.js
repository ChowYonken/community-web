import request from '../request'

// 输入高风险地区查找外出人员
export function getRiskplace(riskplace, offset, limit) {
  return request({
    url: '/main/manage/emergent/riskplace',
    method: 'post',
    data: {
      riskplace,
      offset,
      limit
    }
  })
}

export function getRiskplaceTotal(riskplace) {
  return request({
    url: '/main/manage/emergent/riskplace/total',
    method: 'post',
    data: {
      riskplace
    }
  })
}
