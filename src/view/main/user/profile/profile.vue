<template>
  <div class="profile">
    <el-card class="box-card">
      <info
        :infoFormConfig="infoFormConfig"
        :defaultInfo="userInfo"
        @submitBtnClick="handleSubmitClick"
      />
    </el-card>
  </div>
</template>

<script>
import Info from '@/components/info/info.vue'
import { infoFormConfig } from './config/info-config'
import { updateUserInfo, queryUserInfo } from '@/network/api/user'

export default {
  components: {
    Info
  },
  data() {
    return {
      infoFormConfig: {},
      userInfo: {}
    }
  },
  created() {
    this.infoFormConfig = infoFormConfig
    // 获取住户信息
    this.userInfo = this.$store.state.userInfo
    // 获取新的住户信息
    this._queryUserInfo()
  },
  methods: {
    // 查询用户信息
    _queryUserInfo() {
      const { id } = this.userInfo
      queryUserInfo(id)
        .then((res) => {
          const data = JSON.stringify(res.data.data)
          localStorage.setItem('userInfo', data)
          this.$store.commit('changeUserInfo', res.data.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 提交
    handleSubmitClick(formData) {
      const { realname, cellphone, address } = formData
      const { id } = this.userInfo
      updateUserInfo(id, realname, cellphone, address)
        .then((res) => {
          if (res.data.status === 200) {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this._queryUserInfo()
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped></style>
