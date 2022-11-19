<template>
  <div class="health">
    <el-card class="box-card">
      <health-info
        :searchFormConfig="infoFormConfig"
        @submitBtnClick="handleSubmitClick"
      >
      </health-info>
    </el-card>
  </div>
</template>

<script>
import HealthInfo from '@/components/search/search.vue'
import { infoFormConfig } from './config/info-config'
import { addHealth } from '@/network/api/user'

export default {
  components: {
    HealthInfo
  },
  data() {
    return {
      infoFormConfig: {}
    }
  },
  created() {
    this.infoFormConfig = infoFormConfig
  },
  methods: {
    // 提交
    handleSubmitClick(formData) {
      console.log(formData)
      const { homeTemp, status, riskAreas, healthCode, others } = formData
      addHealth(homeTemp, status, riskAreas, healthCode, others)
        .then((res) => {
          if (res.data.status === 200) {
            this.$message({
              message: '健康申报成功',
              type: 'success'
            })
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
