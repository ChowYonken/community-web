<template>
  <div class="nav-menu">
    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <div v-for="item in getUserMenu" :key="item.id">
        <el-menu-item :index="item.id + ''" @click="handleMenuItemClick(item)">
          <i :class="['iconfont', item.icon]"></i>
          <span slot="title">{{ item.name }}</span>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<script>
import { mapMenuId } from '@/utils/map-menus'

export default {
  data() {
    return {
      defaultActive: ''
    }
  },
  created() {
    // 获取当前路径
    const currentPath = this.$route.path
    const userMenus = this.$store.state.userMenu
    const menu = mapMenuId(userMenus, currentPath)
    this.defaultActive = menu.id + ''
  },
  computed: {
    getUserMenu() {
      return this.$store.state.userMenu
    }
  },
  methods: {
    handleMenuItemClick(item) {
      this.$router.push({ path: item.url })
    }
  }
}
</script>

<style scoped>
.nav-menu {
  width: 300px;
  height: 100%;
}

.iconfont {
  padding-right: 10px;
}

.el-menu-item:hover {
  color: #fff !important;
}

.el-menu-item.is-active {
  color: #fff !important;
  background-color: #0a60bd !important;
}
</style>
