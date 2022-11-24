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
  getNoticeLit,
  getNoticeTotal,
  addNotice,
  updateNotice,
  deleteNotice,
  queryNotice
} from '@/network/api/notice'

export default {
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  data() {
    return {
      searchFormConfig: {},
      contentTableConfig: {},
      modalConfig: {},
      dataList: [],
      dialogVisible: false,
      dialogTitle: '',
      editData: {}, // 编辑的数据
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
    this.modalConfig = modalConfig
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
    // 添加
    _addNotice(title, content, priority) {
      addNotice(title, content, priority)
        .then((res) => {
          if (res.data.status === 200) {
            this.$message({
              showClose: true,
              message: '新建成功',
              type: 'success'
            })
            this._getNoticeLit()
          } else {
            this.$message({
              showClose: true,
              message: '新建失败',
              type: 'error'
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 修改
    _updateNotice(noticeId, title, content, priority) {
      updateNotice(noticeId, title, content, priority)
        .then((res) => {
          if (res.data.status === 200) {
            this.$message({
              showClose: true,
              message: '编辑成功',
              type: 'success'
            })
            this._getNoticeLit()
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
    _deleteNotice(noticeId) {
      deleteNotice(noticeId)
        .then((res) => {
          if (res.data.status === 200) {
            this.$message({
              showClose: true,
              message: '删除成功',
              type: 'success'
            })
            this._getNoticeLit()
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
    // 新建
    handleNewData() {
      this.editData = {}
      this.dialogTitle = '新建'
      this.dialogVisible = true
      this.$refs.modal.getFormData()
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
      this._deleteNotice(id)
    },
    // 重置
    resetBtnClick() {
      this._getNoticeLit()
    },
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
      const { id } = this.editData
      const { title, content, priority } = formData
      // 新建
      if (
        this.dialogTitle === '新建' &&
        title !== '' &&
        content !== '' &&
        priority !== ''
      ) {
        this._addNotice(title, content, priority)
      }

      // 编辑
      if (
        this.dialogTitle === '编辑' &&
        title !== '' &&
        content !== '' &&
        priority !== ''
      ) {
        this._updateNotice(id, title, content, priority)
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
