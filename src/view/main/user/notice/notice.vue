<template>
  <div class="notice">
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
        @newBtnClick="handleNewData"
        @editBtnClick="handleEditData"
        @deleteBtnClick="handleDeleteData"
        @resetBtnClick="resetBtnClick"
      >
        <template #priority="scope">
          <el-tag
            size="medium"
            :type="scope.row.priority === '2' ? 'info' : 'danger'"
            >{{ scope.row.priority === '2' ? '普通' : '紧急' }}</el-tag
          >
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
import { getNoticeLit } from '@/network/api/notice'

export default {
  components: {
    PageSearch,
    PageContent
  },
  data() {
    return {
      searchFormConfig: {},
      contentTableConfig: {},
      dataList: []
    }
  },
  created() {
    this.searchFormConfig = searchFormConfig
    this.contentTableConfig = contentTableConfig
    // 请求列表数据
    this._getNoticeLit()
  },
  methods: {
    // 请求列表数据
    _getNoticeLit() {
      const offset = 0
      const limit = 1
      getNoticeLit(offset, limit)
        .then((res) => {
          this.dataList = res.data.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 提交
    handleSubmitClick(formData) {
      console.log(formData)
    },
    // 新建
    handleNewData() {
      console.log('新建数据')
    },
    // 编辑
    handleEditData(item) {
      console.log('编辑的数据：', item)
    },
    // 删除
    handleDeleteData(item) {
      console.log('删除的数据：', item)
    },
    // 编辑
    resetBtnClick() {
      this._getNoticeLit()
    }
  }
}
</script>

<style scoped>
.box-card {
  margin-bottom: 20px;
}
</style>
