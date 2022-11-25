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
        :listCount="listCount"
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
import { getNoticeLit, getNoticeTotal, queryNotice } from '@/network/api/notice'

export default {
  components: {
    PageSearch,
    PageContent
  },
  data() {
    return {
      searchFormConfig: {},
      contentTableConfig: {},
      dataList: [],
      listCount: 0, // 总数
      offset: 1,
      limit: 5
    }
  },
  watch: {
    offset() {
      this._getNoticeLit()
    },
    limit() {
      this._getNoticeLit()
    }
  },
  created() {
    this.searchFormConfig = searchFormConfig
    this.contentTableConfig = contentTableConfig
    // 请求列表数据
    this._getNoticeLit()
    // 获取总数
    this._getNoticeTotal()
  },
  mounted() {
    // 监听每页大小改变
    this.$bus.$on('sizeChange', (val) => {
      this.limit = val
    })
    // 监听页面改变
    this.$bus.$on('currentChange', (val) => {
      this.offset = val
    })
  },
  beforeDestroy() {
    // 解绑事件
    this.$bus.$off('sizeChange')
    this.$bus.$off('currentChange')
  },
  methods: {
    // 请求列表数据
    _getNoticeLit() {
      getNoticeLit(this.offset, this.limit)
        .then((res) => {
          this.dataList = res.data.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 获取总数
    _getNoticeTotal() {
      getNoticeTotal()
        .then((res) => {
          this.listCount = res.data.data.total
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 搜索
    _queryNotice(priority, timeStart, timeEnd) {
      queryNotice(this.offset, this.limit, priority, timeStart, timeEnd)
        .then((res) => {
          this.dataList = res.data.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 搜索提交
    handleSubmitClick(formData) {
      const { priority } = formData
      const timeStart = formData.timeRange[0] ?? ''
      const timeEnd = formData.timeRange[1] ?? ''
      if (priority !== '' || timeStart !== '') {
        this._queryNotice(priority, timeStart, timeEnd)
      }
    },
    // 重置
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
