<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ userName }}<i class="iconfont icon-xiangxia"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          ><i class="iconfont icon-xiugaimima"></i> 修改密码</el-dropdown-item
        >
        <el-dropdown-item
          ><i class="iconfont icon-tuichudenglu"></i> 退出登录</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  created() {
    this.userName = this.$store.state.userInfo.realname
  },
  data() {
    return {
      userName: ''
    }
  }
}
</script>

<style scoped>
.user-info {
  margin-right: 10px;
}

.el-dropdown-link {
  font-weight: 700;
}

.el-dropdown-link i {
  display: inline-block;
  margin-left: 8px;
  font-size: 14px;
}
</style>
