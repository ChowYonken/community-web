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
      editData: {} // 编辑的数据
    }
  },
  created() {
    this.searchFormConfig = searchFormConfig
    this.contentTableConfig = contentTableConfig
    this.modalConfig = modalConfig
    // 请求列表数据
    this._getNoticeLit()
  },
  methods: {
    // 请求列表数据
    _getNoticeLit() {
      const offset = 0
      const limit = 10
      getNoticeLit(offset, limit)
        .then((res) => {
          this.dataList = res.data.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 添加
    _addNotice(title, content, priority) {
      addNotice(title, content, priority)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 修改
    _updateNotice(noticeId, title, content, priority) {
      updateNotice(noticeId, title, content, priority)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 删除
    _deleteNotice(noticeId) {
      deleteNotice(noticeId)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 搜索
    _queryNotice(priority, timeStart, timeEnd) {
      const offset = 0
      const limit = 10
      queryNotice(offset, limit, priority, timeStart, timeEnd)
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
      console.log('删除的数据：', item)
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
    }
  }
}
</script>

<style scoped>
.box-card {
  margin-bottom: 20px;
}
</style>
