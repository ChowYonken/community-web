<template>
  <div class="login">
    <login-panel></login-panel>
  </div>
</template>

<script>
import LoginPanel from './cpns/login-panel.vue'

export default {
  components: { LoginPanel }
}
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: top;
  width: 100%;
  height: 100%;
  background: url('../../assets/images/login_page.png') no-repeat;
  background-size: 100% 120%;
}
</style>
