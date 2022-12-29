<template>
  <div class="emergent">
    <!-- 搜索 -->
    <el-card class="box-card">
      <page-search
        :searchFormConfig="searchFormConfig"
        @submitBtnClick="handleSubmitClick"
      ></page-search>
    </el-card>
    <!-- 内容 -->
    <el-card class="box-card">
      <page-content
        :contentTableConfig="contentTableConfig"
        :dataList="dataList"
        :listCount="listCount"
        @resetBtnClick="resetBtnClick"
      >
        <template #userInfo="scope">
          <el-popover trigger="hover" placement="top">
            <p>电话: {{ scope.row.userInfo.cellphone }}</p>
            <p>住址: {{ scope.row.userInfo.address }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.userInfo.realname }}</el-tag>
            </div>
          </el-popover>
        </template>
      </page-content>
    </el-card>
  </div>
</template>

<script>
import PageSearch from '@/components/search/search.vue'
import PageContent from '@/components/content/content.vue'
import { searchFormConfig } from './config/search-config'
import { contentTableConfig } from './config/content-config'
import { getRiskplace, getRiskplaceTotal } from '@/network/api/emergent'

export default {
  components: { PageSearch, PageContent },
  data() {
    return {
      searchFormConfig: {},
      contentTableConfig: {},
      dataList: [],
      listCount: 0,
      offset: 1,
      limit: 20
    }
  },
  created() {
    this.searchFormConfig = searchFormConfig
    this.contentTableConfig = contentTableConfig
  },
  methods: {
    _getRiskplace(riskplace) {
      getRiskplace(riskplace, this.offset, this.limit)
        .then((res) => {
          this.dataList = res.data.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 获取总数
    _getRiskplaceTotal(riskplace) {
      getRiskplaceTotal(riskplace)
        .then((res) => {
          this.listCount = res.data.data[0].total
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 按钮操作
    // 搜索提交
    handleSubmitClick(formData) {
      const { riskplace } = formData
      if (riskplace) {
        this._getRiskplace(riskplace)
        this._getRiskplaceTotal(riskplace)
      }
    },
    // 重置
    resetBtnClick() {
      this.dataList = []
      this.listCount = 0
    }
  }
}
</script>

<style scoped>
.box-card {
  margin-bottom: 20px;
}
</style>
