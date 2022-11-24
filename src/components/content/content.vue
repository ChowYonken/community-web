<template>
  <div class="content">
    <ck-table
      :listData="dataList"
      :listCount="listCount"
      v-bind="contentTableConfig"
    >
      <!-- 顶部按钮 -->
      <template #headerHandler>
        <el-button
          type="primary"
          @click="handleResetClick"
          icon="el-icon-refresh"
          plain
        >
          重置
        </el-button>
        <el-button type="primary" @click="handleNewClick" v-if="role === 1">
          {{ contentTableConfig.newBtnTitle ?? '新建数据' }}
        </el-button>
      </template>
      <!-- 操作栏按钮 -->
      <template #handler="scope" v-if="role === 1">
        <div class="handler">
          <el-link
            type="primary"
            icon="el-icon-edit-outline"
            @click="handleEditClick(scope.row)"
            >编辑</el-link
          >
          <el-link
            type="danger"
            icon="el-icon-delete"
            @click="handleDeletePageClick(scope.row)"
            >删除</el-link
          >
        </div>
      </template>
      <!-- 其他动态插槽 -->
      <template v-for="item in otherPropSlots" #[item.slotName]="scope">
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </ck-table>
  </div>
</template>

<script>
import CkTable from '@/base-ui/table/table.vue'

export default {
  components: {
    CkTable
  },
  props: {
    contentTableConfig: {
      type: Object,
      default() {
        return {}
      }
    },
    dataList: {
      type: Array,
      require: true
    },
    listCount: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      role: 0
    }
  },
  computed: {
    otherPropSlots() {
      const others = this.slotNameFilter()
      return others
    }
  },
  created() {
    this.role = this.$store.state.userInfo.role.id
  },
  methods: {
    // 过滤普通的插槽
    slotNameFilter() {
      const others = this.contentTableConfig.propList.filter((item) => {
        if (item?.slotName === 'handler') return false
        return true
      })
      return others
    },
    // 新增
    handleNewClick() {
      this.$emit('newBtnClick')
    },
    // 编辑
    handleEditClick(item) {
      this.$emit('editBtnClick', item)
    },
    // 删除
    handleDeletePageClick(item) {
      this.$emit('deleteBtnClick', item)
    },
    // 重置
    handleResetClick() {
      this.$emit('resetBtnClick')
    }
  }
}
</script>

<style scoped>
.handler .el-link {
  font-size: 12px;
  margin-right: 5px;
}

div/deep/ .el-link [class*='el-icon-'] + span {
  margin-left: 0;
}

div/deep/ .el-button [class*='el-icon-'] + span {
  margin-left: 0;
}
</style>
