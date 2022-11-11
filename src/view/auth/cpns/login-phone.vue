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
          placeholder="请输入6~10位的数字密码"
        ></el-input>
      </el-form-item>
    </el-form>
    <!-- 控制 -->
    <div class="account-control">
      <el-checkbox v-model="isKeepPassword" class="remember"
        >记住密码</el-checkbox
      >
      <el-link type="primary">忘记密码</el-link>
    </div>
    <!-- 提交登录操作 -->
    <el-button type="primary" class="login-btn"> 立即登录 </el-button>
  </div>
</template>

<script>
export default {
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
      isKeepPassword: false
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
