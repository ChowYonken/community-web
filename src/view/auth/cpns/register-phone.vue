<template>
  <div class="register-phone">
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
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          type="password"
          v-model="ruleForm.checkPass"
          autocomplete="off"
          show-password
          placeholder="请再次输入密码"
        ></el-input>
      </el-form-item>
    </el-form>
    <!-- 提交登录操作 -->
    <el-button type="primary" class="login-btn" @click="submitHandle">
      确认注册
    </el-button>
  </div>
</template>

<script>
import { register } from '@/network/api/auth'

export default {
  data() {
    // 验证确认密码
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        account: '',
        password: '',
        checkPass: ''
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
        ],
        checkPass: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitHandle() {
      const account = this.ruleForm.account
      const password = this.ruleForm.password
      const checkPass = this.ruleForm.checkPass
      if (account && password && checkPass && password === checkPass) {
        register(account, password)
          .then((res) => {
            const message = res.data.message
            console.log(res)
            if (res.data.status === 200) {
              this.$message({
                showClose: true,
                message: message,
                type: 'success'
              })
            } else {
              this.$message({
                showClose: true,
                message: message,
                type: 'warning'
              })
            }
          })
          .catch((err) => {
            console.log(err)
          })
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

.login-btn {
  width: 100%;
  margin-top: 10px;
}
</style>
