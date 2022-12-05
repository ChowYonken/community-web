<template>
  <div class="out">
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
  getOutList,
  getOutTotal,
  updateOutByOutId,
  deleteOutByOutId,
  getOutByRealname,
  getOutByAddressOrTime
} from '@/network/api/outward'

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
      this._getOutList()
    },
    limit() {
      this._getOutList()
    }
  },
  created() {
    this.searchFormConfig = searchFormConfig
    this.contentTableConfig = contentTableConfig
    this.modalConfig = modalConfig
    this._getOutList()
    this._getOutTotal()
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
    _getOutList() {
      getOutList(this.offset, this.limit)
        .then((res) => {
          this.dataList = res.data.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 获取总数
    _getOutTotal(realname, end, startTime, endTime) {
      getOutTotal(realname, end, startTime, endTime)
        .then((res) => {
          this.listCount = res.data.data.total
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 编辑
    _updateOutByOutId(
      outId,
      start,
      end,
      startTime,
      endTime,
      transportation,
      user_id
    ) {
      updateOutByOutId(
        outId,
        start,
        end,
        startTime,
        endTime,
        transportation,
        user_id
      )
        .then((res) => {
          if (res.data.status === 200) {
            this.$message({
              showClose: true,
              message: '编辑成功',
              type: 'success'
            })
            this._getOutList()
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
    // 删除
    _deleteOutByOutId(outId) {
      deleteOutByOutId(outId)
        .then((res) => {
          if (res.data.status === 200) {
            this.$message({
              showClose: true,
              message: '删除成功',
              type: 'success'
            })
            this._getOutList()
          } else {
            this.$message({
              showClose: true,
              message: '删除失败',
              type: 'error'
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 查询指定用户真实姓名的外出报备
    _getOutByRealname(realname) {
      getOutByRealname(realname)
        .then((res) => {
          this.dataList = res.data.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 根据指定结束地点或指定时间段的外出报备
    _getOutByAddressOrTime(end, startTime, endTime) {
      getOutByAddressOrTime(this.offset, this.limit, end, startTime, endTime)
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
      const { realname, end } = formData
      const timeStart = formData.timeRange[0] ?? ''
      const timeEnd = formData.timeRange[1] ?? ''
      if (!realname && (end || timeStart)) {
        this._getOutByAddressOrTime(end, timeStart, timeEnd)
        this._getOutTotal(realname, end, timeStart, timeEnd)
      }
      if (realname && !end && !timeStart) {
        this._getOutByRealname(realname)
        this._getOutTotal(realname)
      } else if (realname && (end || timeStart)) {
        this.$message({
          showClose: true,
          message: '只能通过真实姓名搜索',
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
    handleDeleteData(item) {
      const { id } = item
      this._deleteOutByOutId(id)
    },
    // 重置
    resetBtnClick() {
      this._getOutList()
      this._getOutTotal()
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
      const outId = this.editData.id
      const { id } = this.editData.userInfo
      const { start, end, startTime, endTime, transportation } = formData
      if ((start && end && startTime && endTime, transportation)) {
        this._updateOutByOutId(
          outId,
          start,
          end,
          startTime,
          endTime,
          transportation,
          id
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
