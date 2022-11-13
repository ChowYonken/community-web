import request from '../request'

// 请求所有菜单
export function getMenuList() {
  return request({
    url: '/menu/list'
  })
}

// 获取用户菜单
export function getUserMenu(roleId) {
  return request({
    url: '/role/' + roleId + '/menu'
  })
}
