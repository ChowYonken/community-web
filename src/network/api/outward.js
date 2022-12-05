import request from '../request'

// 查询所有外出人员
export function getOutList(offset, limit) {
  return request({
    url: '/main/manage/out/list',
    method: 'post',
    data: {
      offset,
      limit
    }
  })
}

// 查询外出人员总数
export function getOutTotal(realname, end, startTime, endTime) {
  return request({
    url: '/main/manage/out/total',
    method: 'post',
    data: {
      realname,
      end,
      startTime,
      endTime
    }
  })
}

// 查询指定用户真实姓名的外出报备
export function getOutByRealname(realname) {
  return request({
    url: '/main/manage/out/realname',
    method: 'post',
    data: {
      realname
    }
  })
}

// 根据指定结束地点或指定时间段的外出报备
export function getOutByAddressOrTime(offset, limit, end, startTime, endTime) {
  return request({
    url: '/main/manage/out',
    method: 'post',
    data: {
      offset,
      limit,
      end,
      startTime,
      endTime
    }
  })
}

// 修改某条外出报备
export function updateOutByOutId(
  outId,
  start,
  end,
  startTime,
  endTime,
  transportation,
  user_id
) {
  return request({
    url: '/main/manage/out/' + outId,
    method: 'post',
    data: {
      start,
      end,
      startTime,
      endTime,
      transportation,
      user_id
    }
  })
}

// 删除指定id的外出报备
export function deleteOutByOutId(outId) {
  return request({
    url: '/main/manage/out/' + outId,
    method: 'delete'
  })
}
