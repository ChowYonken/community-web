<template>
  <div class="suspected">
    <el-card class="box-card">
      <page-content
        :contentTableConfig="contentTableConfig"
        :dataList="dataList"
        :listCount="listCount"
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
      </page-content>
    </el-card>
  </div>
</template>

<script>
import PageContent from '@/components/content/content.vue'
import { contentTableConfig } from './config/content-config'
import { getSuspectedList, getSuspectedTotal } from '@/network/api/suspected'
import { setSuspected } from '@/network/api/user'

export default {
  components: {
    PageContent
  },
  data() {
    return {
      contentTableConfig: {},
      dataList: [],
      listCount: 0,
      offset: 1,
      limit: 10
    }
  },
  created() {
    this.contentTableConfig = contentTableConfig
    this._getSuspectedList()
    this._getSuspectedTotal()
  },
  methods: {
    // 获取疑似列表
    _getSuspectedList() {
      getSuspectedList(this.offset, this.limit)
        .then((res) => {
          this.dataList = res.data.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 获取总数
    _getSuspectedTotal() {
      getSuspectedTotal()
        .then((res) => {
          this.listCount = res.data.data.total
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 取消疑似
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
    // 重置
    resetBtnClick() {
      this._getSuspectedList()
    },
    async switchChange(scope) {
      const id = scope.row.id
      let mode = scope.row.suspected === 0 ? 0 : 1
      await this._setSuspected(id, mode)
      await this._getSuspectedList()
      await this._getSuspectedTotal()
    }
  }
}
</script>

<style scoped></style>
