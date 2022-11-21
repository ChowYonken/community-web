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
      <slot name="footer"> </slot>
    </div>
  </div>
</template>

<script>
export default {
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
</style>
