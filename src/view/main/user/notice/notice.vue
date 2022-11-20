<template>
  <div class="notice">
    <!-- 搜索 -->
    <el-card class="box-card">
      <page-search
        :searchFormConfig="searchFormConfig"
        @submitBtnClick="handleSubmitClick"
      ></page-search>
    </el-card>
  </div>
</template>

<script>
import PageSearch from '@/components/search/search.vue'
import { searchFormConfig } from './config/search-config'

export default {
  components: {
    PageSearch
  },
  data() {
    return {
      searchFormConfig: {}
    }
  },
  created() {
    this.searchFormConfig = searchFormConfig
  },
  methods: {
    handleSubmitClick(formData) {
      console.log(formData)
    }
  }
}
</script>

<style scoped></style>
