import request from '../request'

// 查询所有住户的健康信息
export function getHealthList(offset, limit) {
  return request({
    url: '/main/manage/health/list',
    method: 'post',
    data: {
      offset,
      limit
    }
  })
}

// 获取用户健康信息总数
export function getHealthTotal(homeTemp, healthCode, startTime, endTime) {
  return request({
    url: '/main/manage/health/total',
    method: 'post',
    data: {
      homeTemp,
      healthCode,
      startTime,
      endTime
    }
  })
}

// 查询指定高于某温度的住户健康信息
export function queryHealthByTemp(offset, limit, homeTemp) {
  return request({
    url: '/main/manage/health/homeTemp',
    method: 'post',
    data: {
      offset,
      limit,
      homeTemp
    }
  })
}

// 查询根据健康码颜色的住户健康信息
export function queryHealthByCode(offset, limit, healthCode) {
  return request({
    url: '/main/manage/health/healthCode',
    method: 'post',
    data: {
      offset,
      limit,
      healthCode
    }
  })
}

// 查询指定时间段的健康信息
export function queryHealthByTime(offset, limit, startTime, endTime) {
  return request({
    url: '/main/manage/health/time',
    method: 'post',
    data: {
      offset,
      limit,
      startTime,
      endTime
    }
  })
}

// 修改某条健康信息
export function updateHealth(
  healthId,
  homeTemp,
  status,
  riskAreas,
  healthCode,
  others
) {
  return request({
    url: '/main/manage/health/' + healthId,
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

// 删除某条健康信息
export function deleteHealth(healthId) {
  return request({
    url: '/main/manage/health/' + healthId,
    method: 'delete'
  })
}
