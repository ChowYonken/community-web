import request from '../request'

// 查询所有设备
export function getDeviceList(offset, limit) {
  return request({
    url: '/main/manage/device/list',
    method: 'post',
    data: {
      offset,
      limit
    }
  })
}

// 查询设备总数
export function getDeviceTotal(name, status) {
  return request({
    url: '/main/manage/device/total',
    method: 'post',
    data: {
      name,
      status
    }
  })
}

// 搜索
export function queryDevice(offset, limit, name, status) {
  return request({
    url: '/main/manage/device/query',
    method: 'post',
    data: {
      offset,
      limit,
      name,
      status
    }
  })
}

// 添加设备
export function addDevice(name, status, others, realname) {
  return request({
    url: '/main/manage/device',
    method: 'post',
    data: {
      name,
      status,
      others,
      realname
    }
  })
}

// 修改设备
export function updateDevice(deviceId, name, status, others) {
  return request({
    url: '/main/manage/device/' + deviceId,
    method: 'post',
    data: {
      name,
      status,
      others
    }
  })
}

// 删除设备
export function deleteDevice(deviceId) {
  return request({
    url: '/main/manage/device/' + deviceId,
    method: 'delete'
  })
}
