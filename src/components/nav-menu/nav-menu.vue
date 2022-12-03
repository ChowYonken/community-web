<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="../../assets/images/logo.svg" alt="" />
      <span class="title" v-if="!isCollapse">社区疫情防控管理</span>
    </div>
    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
      :collapse-transition="false"
      :collapse="isCollapse"
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
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      defaultActive: ''
    }
  },
  created() {
    // 获取当前路径
    const currentPath = this.$route.path
    this.changeDefaultActive(currentPath)
  },
  watch: {
    '$route.path'(newVal, oldVal) {
      this.changeDefaultActive(newVal)
    }
  },
  computed: {
    getUserMenu() {
      return this.$store.state.userMenu
    }
  },
  methods: {
    // 监听侧边导航栏
    handleMenuItemClick(item) {
      this.$router.push({ path: item.url })
    },
    // 映射id
    changeDefaultActive(currentPath) {
      const userMenus = this.$store.state.userMenu
      const menu = mapMenuId(userMenus, currentPath)
      if (menu) {
        this.defaultActive = menu.id + ''
        this.breadCrumb = menu.name
      }
    }
  }
}
</script>

<style scoped>
.nav-menu {
  width: 300px;
  height: 100%;
}

.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.logo .img {
  height: 100%;
  margin: 0 5px;
}

.logo .title {
  font-size: 18px;
  color: #fff;
  font-weight: 700;
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
