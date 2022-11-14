<template>
  <div class="login-phone">
    <!-- 输入内容 -->
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="80px"
      class="demo-ruleForm"
    >
      <el-form-item label="账号" prop="account">
        <el-input
          v-model="ruleForm.account"
          autocomplete="off"
          placeholder="请输入你的账号"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
          show-password
          placeholder="请输入6~10位的数字密码"
        ></el-input>
      </el-form-item>
    </el-form>
    <!-- 控制 -->
    <div class="account-control">
      <el-checkbox
        v-model="isKeepPassword"
        class="remember"
        @change="keepPasswordHandle"
        >记住密码</el-checkbox
      >
      <el-link type="primary">忘记密码</el-link>
    </div>
    <!-- 提交登录操作 -->
    <el-button type="primary" class="login-btn" @click="submitHandle">
      立即登录
    </el-button>
  </div>
</template>

<script>
import { login } from '@/network/api/auth'
import { getUserInfo } from '@/network/api/user'
import { getUserMenu } from '@/network/api/menu'
import { Base64 } from 'js-base64'

export default {
  created() {
    this.ruleForm.account = localStorage.getItem('account')
    this.ruleForm.password = Base64.decode(localStorage.getItem('password'))
    if (this.ruleForm.password !== '') {
      this.isKeepPassword = true
    }
  },
  data() {
    return {
      ruleForm: {
        account: '',
        password: ''
      },
      rules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          {
            min: 11,
            max: 11,
            message: '请输出电话号码的正确长度',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '请输出 3 ~ 10 个字符的密码',
            trigger: 'blur'
          }
        ]
      },
      isKeepPassword: false,
      roleId: null // 保存角色id
    }
  },
  methods: {
    // 登录
    async submitHandle() {
      const account = this.ruleForm.account
      const password = this.ruleForm.password

      // 账号和密码不为空
      if (account && password) {
        await login(account, password)
          .then((res) => {
            const message = res.data.message
            if (res.data.status === 100) {
              const token = res.data.token
              localStorage.setItem('token', token)
              this.$store.commit('changeToken', token)
              this.$message({
                showClose: true,
                message: message,
                type: 'success'
              })
            } else {
              this.$message({
                showClose: true,
                message: message,
                type: 'error'
              })
              // 如果密码错误，则不能记住密码
              localStorage.setItem('account', '')
              localStorage.setItem('password', '')
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }

      // 获取登录用户信息
      await getUserInfo()
        .then((res) => {
          const userInfo = res.data.data
          // 保存roleId
          this.roleId = res.data.data.role.id
          localStorage.setItem('userInfo', JSON.stringify(res.data.data))
          this.$store.commit('changeUserInfo', userInfo)
        })
        .catch((err) => {
          console.log(err)
        })

      // 获取用户菜单
      await getUserMenu(this.roleId)
        .then((res) => {
          // 保存用户菜单
          const userMenu = res.data.data
          localStorage.setItem('userMenu', JSON.stringify(res.data.data))
          this.$store.commit('changeUserMenu', userMenu)
          this.$router.push('/main').catch(() => {})
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 记住密码
    keepPasswordHandle() {
      if (this.isKeepPassword) {
        // 密码加密
        let password = Base64.encode(this.ruleForm.password)
        localStorage.setItem('account', this.ruleForm.account)
        localStorage.setItem('password', password)
      } else {
        localStorage.setItem('account', '')
        localStorage.setItem('password', '')
      }
    }
  }
}
</script>

<style scoped>
div/deep/.el-form-item__label {
  color: #fff !important;
}

div/deep/.el-input__inner {
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px solid #dcdfe6;
  color: #fff;
}

.account-control {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

.account-control .remember {
  color: #fff;
}

.login-btn {
  width: 100%;
  margin-top: 10px;
}
</style>
