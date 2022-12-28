import request from '../request'

// 查询所有温度
export function getTempList(offset, limit) {
  return request({
    url: '/main/manage/temp/list',
    method: 'post',
    data: {
      offset,
      limit
    }
  })
}

// 查询外出温度总数
export function getTempTotal(outTemp, status) {
  return request({
    url: '/main/manage/temp/total',
    method: 'post',
    data: {
      outTemp,
      status
    }
  })
}

// 搜索
export function queryTemp(offset, limit, outTemp, status) {
  return request({
    url: '/main/manage/temp/query',
    method: 'post',
    data: {
      offset,
      limit,
      outTemp,
      status
    }
  })
}
