<template>
  <div class="user">
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
        <template #suspected="scope">
          <el-switch
            v-model="scope.row.suspected"
            active-color="#13ce66"
            :active-value="1"
            :inactive-value="0"
            @change="switchChange(scope)"
          >
          </el-switch>
        </template>
        <template #role="scope">
          <el-tag
            size="medium"
            :type="scope.row.role.name === '住户' ? 'success' : 'danger'"
            >{{ scope.row.role.name }}</el-tag
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
  getUserList,
  getUserTotal,
  addUser,
  updateUser,
  deleteUser,
  queryUser,
  setSuspected
} from '@/network/api/user'

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
      this._getUserList()
    },
    limit() {
      this._getUserList()
    }
  },
  created() {
    this.searchFormConfig = searchFormConfig
    this.contentTableConfig = contentTableConfig
    this.modalConfig = modalConfig
    this._getUserList()
    this._getUserTotal()
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
    // 请求住户列表
    _getUserList() {
      getUserList(this.offset, this.limit)
        .then((res) => {
          this.dataList = res.data.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 获取总数
    _getUserTotal(realname, address) {
      getUserTotal(realname, address)
        .then((res) => {
          this.listCount = res.data.data.total
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 添加
    _addUser(account, password, realname, cellphone, address) {
      addUser(account, password, realname, cellphone, address)
        .then((res) => {
          if (res.data.status === 200) {
            this.$message({
              showClose: true,
              message: '新建成功',
              type: 'success'
            })
            this._getUserList()
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
    _updateUser(userId, realname, cellphone, address) {
      updateUser(userId, realname, cellphone, address)
        .then((res) => {
          if (res.data.status === 200) {
            this.$message({
              showClose: true,
              message: '编辑成功',
              type: 'success'
            })
            this._getUserList()
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
    _deleteUser(userId) {
      deleteUser(userId)
        .then((res) => {
          if (res.data.status === 200) {
            this.$message({
              showClose: true,
              message: '删除成功',
              type: 'success'
            })
            this._getUserList()
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
    _queryUser(realname, address) {
      queryUser(this.offset, this.limit, realname, address)
        .then((res) => {
          console.log(res)
          this.dataList = res.data.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 设疑似人员
    _setSuspected(userId, mode) {
      setSuspected(userId, mode)
        .then((res) => {
          if (res.data.status === 200) {
            this.$message({
              showClose: true,
              message: '设置成功',
              type: 'success'
            })
          } else {
            this.$message({
              showClose: true,
              message: '设置失败',
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
      console.log(formData)
      const { realname, address } = formData
      if (realname || address) {
        this._queryUser(realname, address)
        this._getUserTotal(realname, address)
      }
    },
    // 新建
    handleNewData() {
      this.editData = {}
      this.dialogTitle = '新建'
      this.dialogVisible = true
      // 新建时显示密码框
      this.isHidden(false)
      this.$refs.modal.getFormData()
    },
    // 编辑
    handleEditData(item) {
      this.dialogTitle = '编辑'
      this.dialogVisible = true
      this.editData = item
      // 编辑时不显示密码框
      this.isHidden(true)
      this.$refs.modal.editMapData(item)
    },
    // 删除
    handleDeleteData(item) {
      const { id } = item
      this._deleteUser(id)
    },
    // 重置
    resetBtnClick() {
      this._getUserList()
      this._getUserTotal()
    },
    // 密码框显隐
    isHidden(val) {
      const index = this.modalConfig.formItems.findIndex((res) => {
        return res.field === 'password'
      })
      this.modalConfig.formItems[index].isHidden = val
    },
    // switch开关
    switchChange(scope) {
      const id = scope.row.id
      let mode = scope.row.suspected === 0 ? 0 : 1
      this._setSuspected(id, mode)
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
      const { id } = this.editData
      const { account, password, realname, cellphone, address } = formData
      // 新增
      if (
        this.dialogTitle === '新建' &&
        account &&
        password &&
        realname &&
        cellphone &&
        address
      ) {
        this._addUser(account, password, realname, cellphone, address)
      }

      // 编辑
      if (this.dialogTitle === '编辑' && realname && cellphone && address) {
        this._updateUser(id, realname, cellphone, address)
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
