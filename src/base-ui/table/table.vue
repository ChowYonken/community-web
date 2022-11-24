<template>
  <div class="table">
    <!-- 头部插槽 -->
    <div class="header">
      <slot name="header">
        <div class="title">
          {{ title }}
        </div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>

    <!-- 数据列表插槽 -->
    <el-table
      :data="listData"
      border
      style="width: 100%"
      v-bind="childrenProps"
    >
      <!-- 选择 -->
      <el-table-column v-if="showSelectColumn" align="center" type="selection">
      </el-table-column>
      <!-- 序号 -->
      <el-table-column
        v-if="showIndexColumn"
        label="序列"
        align="center"
        type="index"
        width="80"
      ></el-table-column>
      <!-- 数据 -->
      <template v-for="propItem in propList">
        <el-table-column
          v-bind="propItem"
          align="center"
          show-overflow-tooltip
          :key="propItem.prop"
        >
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <!-- 尾部插槽 -->
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <!-- 分页器 -->
        <el-pagination
          :currentPage="currentPage"
          :page-size="pageSize"
          :page-sizes="[5, 10, 20]"
          layout="->, total, sizes, prev, pager, next, jumper"
          :total="listCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'page',
    event: 'update:page'
  },
  props: {
    title: {
      type: String,
      default: ''
    },

    listData: {
      type: Array,
      require: true
    },
    propList: {
      type: Array,
      require: true
    },
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    childrenProps: {
      type: Object,
      default: () => ({})
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    listCount: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      currentPage: 1, // 当前页码
      pageSize: 5 // 每页大小
    }
  },
  methods: {
    // 大小改变
    handleSizeChange(val) {
      this.$bus.$emit('sizeChange', val)
    },
    // 当前页面改变
    handleCurrentChange(val) {
      this.$bus.$emit('currentChange', val)
    }
  }
}
</script>

<style scoped>
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.header .title {
  font-size: 20px;
  font-weight: 700;
}

.handler {
  align-items: center;
}

.footer {
  margin-top: 15px;
}
</style>
