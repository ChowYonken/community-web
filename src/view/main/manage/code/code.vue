<template>
  <div class="code">
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
        @editBtnClick="handleEditData"
        @deleteBtnClick="handleDeleteData"
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
        <template #homeTemp="scope"> {{ scope.row.homeTemp }}°C </template>
        <template #riskAreas="scope">
          <template v-if="scope.row.riskAreas === '1'">是</template>
          <template v-else>否</template>
        </template>
        <template #healthCode="scope">
          <template v-if="scope.row.healthCode === '绿码'">
            <el-tag type="success">绿码</el-tag>
          </template>
          <template v-else-if="scope.row.healthCode === '黄码'">
            <el-tag type="warning">黄码</el-tag>
          </template>
          <template v-else>
            <el-tag type="danger">绿码</el-tag>
          </template>
        </template>
      </page-content>
    </el-card>
    <!-- 弹窗 -->
    <page-modal
      ref="modal"
      :modalConfig="modalConfig"
      :dialogVisible="dialogVisible"
      :dialogTitle="dialogTitle"
      :editData="editData"
      @changeDialog="changeDialog"
      @closeDialog="closeDialog"
      @confirmDialog="confirmDialog"
    ></page-modal>
  </div>
</template>

<script>
import PageSearch from '@/components/search/search.vue'
import PageContent from '@/components/content/content.vue'
import PageModal from '@/components/modal/modal.vue'
import { searchFormConfig } from './config/search-config'
import { contentTableConfig } from './config/content-config'
import { modalConfig } from './config/modal-config'
import {
  getHealthList,
  getHealthTotal,
  queryHealthByTemp,
  queryHealthByCode,
  queryHealthByTime,
  updateHealth,
  deleteHealth
} from '@/network/api/health'

export default {
  components: { PageSearch, PageContent, PageModal },
  data() {
    return {
      searchFormConfig: {},
      contentTableConfig: {},
      modalConfig: {},
      dataList: [],
      listCount: 0,
      dialogVisible: false,
      dialogTitle: '',
      editData: {}, // 编辑的数据
      offset: 1,
      limit: 5
    }
  },
  watch: {
    offset() {
      this._getHealthList()
    },
    limit() {
      this._getHealthList()
    }
  },
  created() {
    this.searchFormConfig = searchFormConfig
    this.contentTableConfig = contentTableConfig
    this.modalConfig = modalConfig
    this._getHealthList()
    this._getHealthTotal()
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
    // 请求列表数据
    _getHealthList() {
      getHealthList(this.offset, this.limit)
        .then((res) => {
          this.dataList = res.data.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 获取总数
    _getHealthTotal(homeTemp, healthCode, startTime, endTime) {
      getHealthTotal(homeTemp, healthCode, startTime, endTime)
        .then((res) => {
          this.listCount = res.data.data.total
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 查询指定高于某温度的住户健康信息
    _queryHealthByTemp(homeTemp) {
      queryHealthByTemp(this.offset, this.limit, homeTemp)
        .then((res) => {
          this.dataList = res.data.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 查询根据健康码颜色的住户健康信息
    _queryHealthByCode(healthCode) {
      queryHealthByCode(this.offset, this.limit, healthCode)
        .then((res) => {
          this.dataList = res.data.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 查询指定时间段的健康信息
    _queryHealthByTime(startTime, endTime) {
      queryHealthByTime(this.offset, this.limit, startTime, endTime)
        .then((res) => {
          this.dataList = res.data.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 编辑
    _updateHealth(healthId, homeTemp, status, riskAreas, healthCode, others) {
      updateHealth(healthId, homeTemp, status, riskAreas, healthCode, others)
        .then((res) => {
          if (res.data.status === 200) {
            this.$message({
              showClose: true,
              message: '编辑成功',
              type: 'success'
            })
            this._getHealthList()
          } else {
            this.$message({
              showClose: true,
              message: '编辑失败',
              type: 'error'
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },

    // 按钮操作
    // 搜索提交
    handleSubmitClick(formData) {
      const { homeTemp, healthCode } = formData
      const timeStart = formData.timeRange[0] ?? ''
      const timeEnd = formData.timeRange[1] ?? ''
      if (homeTemp && !healthCode && !timeStart) {
        this._queryHealthByTemp(homeTemp)
        this._getHealthTotal(homeTemp, healthCode, timeStart, timeEnd)
      } else if (!homeTemp && healthCode && !timeStart) {
        this._queryHealthByCode(healthCode)
        this._getHealthTotal(homeTemp, healthCode, timeStart, timeEnd)
      } else if (!homeTemp && !healthCode && timeStart) {
        this._queryHealthByTime(timeStart, timeEnd)
        this._getHealthTotal(homeTemp, healthCode, timeStart, timeEnd)
      } else {
        this.$message({
          showClose: true,
          message: '只能通过其中一个条件查询',
          type: 'warning'
        })
      }
    },
    // 编辑
    handleEditData(item) {
      this.dialogTitle = '编辑'
      this.dialogVisible = true
      this.editData = item
      this.$refs.modal.editMapData(item)
    },
    // 删除
    handleDeleteData(item) {},
    // 重置
    resetBtnClick() {
      this._getHealthList()
      this._getHealthTotal()
    },

    // dialog弹窗
    // 修改dialog
    changeDialog(val) {
      this.dialogVisible = val
    },
    // 监听dialog取消按钮
    closeDialog() {
      this.dialogVisible = false
    },
    // 监听确定按钮
    confirmDialog(formData) {
      this.dialogVisible = false
      const healthId = this.editData.id
      const { homeTemp, status, riskAreas, healthCode, others } = formData
      if (homeTemp && status && riskAreas && healthCode && others) {
        this._updateHealth(
          healthId,
          homeTemp,
          status,
          riskAreas,
          healthCode,
          others
        )
      }
    }
  }
}
</script>

<style scoped>
.box-card {
  margin-bottom: 20px;
}
</style>
