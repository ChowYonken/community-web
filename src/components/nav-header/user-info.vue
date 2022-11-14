<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ this.$store.state.userInfo.realname
        }}<i class="iconfont icon-xiangxia"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          ><i class="iconfont icon-xiugaimima"></i> 修改密码</el-dropdown-item
        >
        <el-dropdown-item @click.native="handleExitClick"
          ><i class="iconfont icon-tuichudenglu"></i> 退出登录</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { logout } from '@/network/api/auth.js'

export default {
  methods: {
    // 退出登录
    handleExitClick() {
      logout()
        .then((res) => {
          localStorage.removeItem('token')
          localStorage.removeItem('userInfo')
          localStorage.removeItem('userMenu')
          this.$router.push('/login').catch(() => {})
          this.$message({
            showClose: true,
            type: 'success',
            message: '退出登录成功'
          })
        })
        .catch((err) => {
          console.log(err)
        })
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
