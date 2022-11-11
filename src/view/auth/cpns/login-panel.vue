<template>
  <div class="login-panel">
    <el-card>
      <!-- 标题 -->
      <div class="title">疫情防控管理系统</div>
      <!-- 输入框 -->
      <el-tabs stretch>
        <el-tab-pane label="登录">
          <login-phone></login-phone>
        </el-tab-pane>
        <el-tab-pane label="注册">
          <register-phone></register-phone>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import LoginPhone from './login-phone.vue'
import RegisterPhone from './register-phone.vue'

export default {
  components: {
    LoginPhone,
    RegisterPhone
  }
}
</script>

<style scoped>
.login-panel {
  margin-top: 130px;
}

.el-card {
  background-color: rgba(0, 0, 0, 0.4);
}

.title {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  color: #fff;
}

div/deep/.el-tabs__item {
  color: #fff;
}
</style>
