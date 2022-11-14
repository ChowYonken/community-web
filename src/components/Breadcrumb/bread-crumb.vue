<template>
  <div class="bread-crumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
      <template v-if="isHome(breadCrumb)">
        <el-breadcrumb-item>{{ breadCrumb }}</el-breadcrumb-item>
      </template>
      <template v-else></template>
    </el-breadcrumb>
  </div>
</template>

<script>
import { mapMenuId } from '@/utils/map-menus'

export default {
  data() {
    return {
      defaultActive: '',
      breadCrumb: ''
    }
  },
  created() {
    // 获取当前路径
    const currentPath = this.$route.path
    this.changeDefaultActive(currentPath)
  },
  computed: {
    isHome() {
      return function (breadCrumb) {
        if (breadCrumb === '主页') {
          return false
        } else {
          return true
        }
      }
    }
  },
  watch: {
    '$route.path'(newVal, oldVal) {
      this.changeDefaultActive(newVal)
    }
  },
  methods: {
    // 映射id
    changeDefaultActive(currentPath) {
      const userMenus = this.$store.state.userMenu
      const menu = mapMenuId(userMenus, currentPath)
      this.defaultActive = menu.id + ''
      this.breadCrumb = menu.name
    }
  }
}
</script>

<style scoped></style>
