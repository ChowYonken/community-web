<template>
  <div class="device">
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
            >{{ scope.row.status === '1' ? '正常' : '损坏' }}</el-tag
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
  getDeviceList,
  getDeviceTotal,
  queryDevice,
  addDevice,
  updateDevice,
  deleteDevice
} from '@/network/api/device'

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
      listCount: 0, // 总数
      offset: 1,
      limit: 5,
      dialogVisible: false,
      dialogTitle: '',
      editData: {} // 编辑的数据
    }
  },
  watch: {
    offset() {
      this._getDeviceList()
    },
    limit() {
      this._getDeviceList()
    }
  },
  created() {
    this.searchFormConfig = searchFormConfig
    this.contentTableConfig = contentTableConfig
    this.modalConfig = modalConfig
    this._getDeviceList()
    this._getDeviceTotal()
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
    // 查询所有设备
    _getDeviceList() {
      getDeviceList(this.offset, this.limit)
        .then((res) => {
          this.dataList = res.data.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 获取总数
    _getDeviceTotal(name, status) {
      getDeviceTotal(name, status)
        .then((res) => {
          this.listCount = res.data.data.total
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 添加
    _addDevice(name, status, others, realname) {
      addDevice(name, status, others, realname)
        .then((res) => {
          if (res.data.status === 200) {
            this.$message({
              showClose: true,
              message: '新建成功',
              type: 'success'
            })
            this._getDeviceList()
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
    _updateDevice(deviceId, name, status, others) {
      updateDevice(deviceId, name, status, others)
        .then((res) => {
          if (res.data.status === 200) {
            this.$message({
              showClose: true,
              message: '编辑成功',
              type: 'success'
            })
            this._getDeviceList()
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
    _deleteDevice(deviceId) {
      deleteDevice(deviceId)
        .then((res) => {
          if (res.data.status === 200) {
            this.$message({
              showClose: true,
              message: '删除成功',
              type: 'success'
            })
            this._getDeviceList()
            this._getDeviceTotal()
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
    _queryDevice(name, status) {
      queryDevice(this.offset, this.limit, name, status)
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
      const { deviceName, status } = formData
      if (deviceName && !status) {
        this._queryDevice(deviceName)
        this._getDeviceTotal(deviceName, status)
      } else if (!deviceName && status) {
        this._queryDevice(deviceName, status)
        this._getDeviceTotal(deviceName, status)
      } else {
        this.$message({
          showClose: true,
          message: '只能通过其中一个条件查询',
          type: 'warning'
        })
      }
    },
    // 新建
    handleNewData() {
      this.editData = {}
      this.dialogTitle = '新建'
      this.dialogVisible = true
      // 新建时显示住户名框
      this.isHidden(false)
      this.$refs.modal.getFormData()
    },
    // 编辑
    handleEditData(item) {
      this.dialogTitle = '编辑'
      this.dialogVisible = true
      this.editData = item
      // 编辑时不显示住户名框
      this.isHidden(true)
      this.$refs.modal.editMapData(item)
    },
    // 删除
    handleDeleteData(item) {
      const { id } = item
      this._deleteDevice(id)
    },
    // 重置
    resetBtnClick() {
      this._getDeviceList()
      this._getDeviceTotal()
    },
    // 住户名显隐
    isHidden(val) {
      const index = this.modalConfig.formItems.findIndex((res) => {
        return res.field === 'realname'
      })
      this.modalConfig.formItems[index].isHidden = val
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
    async confirmDialog(formData) {
      this.dialogVisible = false
      const { id } = this.editData
      const { name, status, others, realname } = formData
      // 新增
      if (this.dialogTitle === '新建' && name && status && others && realname) {
        await this._addDevice(name, status, others, realname)
        await this._getDeviceTotal()
      }
      // 编辑
      if (this.dialogTitle === '编辑' && name && status && others) {
        this._updateDevice(id, name, status, others, realname)
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
