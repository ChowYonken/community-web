import request from '../request'

// 获取公告列表
export function getNoticeLit(offset, limit) {
  return request({
    url: '/main/notice/list',
    method: 'post',
    data: { offset, limit }
  })
}

// 获取公告总数
export function getNoticeTotal(priority, timeStart, timeEnd) {
  return request({
    url: '/main/notice/total',
    method: 'post',
    data: {
      priority,
      timeStart,
      timeEnd
    }
  })
}

// 添加公告
export function addNotice(title, content, priority) {
  return request({
    url: '/main/manage/notice',
    method: 'post',
    data: { title, content, priority }
  })
}

// 编辑公告
export function updateNotice(noticeId, title, content, priority) {
  return request({
    url: '/main/manage/notice/' + noticeId,
    method: 'post',
    data: { title, content, priority }
  })
}

export function deleteNotice(noticeId) {
  return request({
    url: '/main/manage/notice/' + noticeId,
    method: 'delete'
  })
}

// 搜索
export function queryNotice(offset, limit, priority, timeStart, timeEnd) {
  return request({
    url: '/main/user/notice',
    method: 'post',
    data: { offset, limit, priority, timeStart, timeEnd }
  })
}
