<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ this.$store.state.userInfo.realname
        }}<i class="iconfont icon-xiangxia"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="handleUpdatePwdClick"
          ><i class="iconfont icon-xiugaimima"></i> 修改密码</el-dropdown-item
        >
        <el-dropdown-item @click.native="handleExitClick"
          ><i class="iconfont icon-tuichudenglu"></i> 退出登录</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
    <!-- 弹窗 -->
    <page-modal
      ref="modal"
      :modalConfig="modalConfig"
      :dialogVisible="dialogVisible"
      :dialogTitle="dialogTitle"
      @changeDialog="changeDialog"
      @closeDialog="closeDialog"
      @confirmDialog="confirmDialog"
    ></page-modal>
  </div>
</template>

<script>
import { logout, updatePwd } from '@/network/api/auth.js'
import PageModal from '@/components/modal/modal.vue'
import { modalConfig } from './config/modal-config'

export default {
  components: {
    PageModal
  },
  data() {
    return {
      modalConfig: {},
      dialogVisible: false,
      dialogTitle: ''
    }
  },
  created() {
    this.modalConfig = modalConfig
  },
  methods: {
    // 修改密码
    _updatePwd(oldPwd, newPwd) {
      updatePwd(oldPwd, newPwd)
        .then((res) => {
          console.log(res)
          if (res.data.status === 100) {
            this.$message({
              showClose: true,
              message: '修改成功',
              type: 'success'
            })
            // 返回login页面
            localStorage.removeItem('token')
            localStorage.removeItem('userInfo')
            localStorage.removeItem('userMenu')
            this.$router.push('/login').catch(() => {})
          } else {
            this.$message({
              showClose: true,
              message: '修改失败',
              type: 'error'
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
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
    },
    // 修改密码
    handleUpdatePwdClick() {
      this.dialogTitle = '修改'
      this.dialogVisible = true
      this.$refs.modal.getFormData()
    },
    // 修改dialog
    changeDialog(val) {
      this.dialogVisible = val
    },
    // 监听dialog取消按钮
    closeDialog() {
      this.dialogVisible = false
    },
    // 监听确定按钮
    confirmDialog(formData) {
      const { oldPwd, newPwd } = formData
      console.log(oldPwd, newPwd)
      this.dialogVisible = false
      if (oldPwd && newPwd) {
        this._updatePwd(oldPwd, newPwd)
      }
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
