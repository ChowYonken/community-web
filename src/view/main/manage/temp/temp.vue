<template>
  <div class="temp">
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
        <template #status="scope">
          <el-tag
            size="medium"
            :type="scope.row.status === '1' ? 'success' : 'danger'"
            >{{ scope.row.status === '1' ? '正常' : '发烧' }}</el-tag
          >
        </template>
        <template #deviceInfo="scope">
          <el-tag type="info">{{ scope.row.deviceInfo.name }}</el-tag>
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
import { getTempList, getTempTotal, queryTemp } from '@/network/api/temp'

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
      this._getTempList()
    },
    limit() {
      this._getTempList()
    }
  },
  created() {
    this.searchFormConfig = searchFormConfig
    this.contentTableConfig = contentTableConfig
    this._getTempList()
    this._getTempTotal()
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
    // 网络请求
    // 获取温度列表
    _getTempList() {
      getTempList(this.offset, this.limit)
        .then((res) => {
          this.dataList = res.data.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 获取温度总数
    _getTempTotal(name, status) {
      getTempTotal(name, status)
        .then((res) => {
          this.listCount = res.data.data.total
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 搜索
    _queryTemp(outTemp, status) {
      queryTemp(this.offset, this.limit, outTemp, status)
        .then((res) => {
          this.dataList = res.data.data
        })
        .catch((err) => {
          console.log(err)
        })
    },

    // 按钮操作
    // 搜索提交
    handleSubmitClick(formData) {
      const { outTemp, status } = formData
      if (outTemp || status) {
        this._queryTemp(outTemp, status)
        this._getTempTotal(outTemp, status)
      }
    },
    // 重置
    resetBtnClick() {
      this._getTempList()
      this._getTempTotal()
    }
  }
}
</script>

<style scoped>
.box-card {
  margin-bottom: 20px;
}
</style>
