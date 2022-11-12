import request from '../request'

// 请求所有菜单
export function getMenuList() {
  return request({
    url: '/menu/list'
  })
}
