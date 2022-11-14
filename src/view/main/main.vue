<template>
  <div class="main">
    <el-container class="main-content">
      <!-- 菜单栏 -->
      <el-aside width="210px">
        <nav-menu></nav-menu>
      </el-aside>
      <el-container>
        <!-- 顶部导航栏 -->
        <el-header>Header</el-header>
        <!-- 内容 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import NavMenu from '@/components/nav-menu/nav-menu.vue'

export default {
  components: { NavMenu }
}
</script>

<style scoped>
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.main-content {
  height: 100%;
}

.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  text-align: left;
  cursor: pointer;
  background-color: #0c2135;
}
</style>
