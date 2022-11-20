<template>
  <div class="out">
    <el-card class="box-card">
      <out-info
        :searchFormConfig="infoFormConfig"
        @submitBtnClick="handleSubmitClick"
      ></out-info>
    </el-card>
  </div>
</template>

<script>
import OutInfo from '@/components/search/search.vue'
import { infoFormConfig } from './config/info-config'
import { addOut } from '@/network/api/user'

export default {
  components: {
    OutInfo
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
    handleSubmitClick(formData) {
      console.log(formData)
      const { start, end, transportation } = formData
      const startTime = formData.timeRange[0]
      const endTime = formData.timeRange[1]
      addOut(start, end, startTime, endTime, transportation)
        .then((res) => {
          if (res.data.status === 200) {
            this.$message({
              message: '外出报备成功',
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
