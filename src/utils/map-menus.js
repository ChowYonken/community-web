let firstMenu = null

export function mapMenusToRoutes(userMenus) {
  // 需要动态添加的路由
  const routes = []
  // 1.加载所有routes
  const allRoutes = []
  const routeFile = require.context('../router/main', true, /\.js/)

  routeFile.keys().forEach((key) => {
    const r = key.split('.')[1]
    const route = require('../router/main' + r)
    allRoutes.push(route.default)
  })

  // 2.根据用户菜单获取需要的routes
  const getRoute = (menus) => {
    for (const menu of menus) {
      const route = allRoutes.find((route) => route.path === menu.url)
      if (route) {
        routes.push(route)
      }
      if (!firstMenu) {
        firstMenu = menu
      }
    }
  }

  getRoute(userMenus)

  return routes
}

export { firstMenu }
