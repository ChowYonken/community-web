<template>
  <div class="search">
    <ck-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">{{ searchFormConfig.title }}</h1>
      </template>
      <template #footer>
        <div :style="`text-align: ${searchFormConfig.btnStyle.center}`">
          <!-- 搜索 -->
          <el-button
            type="primary"
            :icon="`${searchFormConfig.btn.search.icon}`"
            @click="handleSearchClick"
            >{{ searchFormConfig.btn.search.name }}</el-button
          >
        </div>
      </template>
    </ck-form>
  </div>
</template>

<script>
import CkForm from '@/base-ui/form/form.vue'

export default {
  components: {
    CkForm
  },
  props: {
    searchFormConfig: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      formItems: this.searchFormConfig.formItems ?? [],
      formData1: {}
    }
  },
  computed: {
    formData: {
      get: function () {
        const formOriginData = this.getFormData()
        return formOriginData
      },
      set: function (val) {
        return val
      }
    }
  },
  methods: {
    getFormData() {
      // 通过配置文件的field来获取formData里面有什么类型
      const formOriginData = {}
      for (const item of this.formItems) {
        formOriginData[item.field] = ''
      }
      return formOriginData
    },
    // 重置
    handleResetClick() {
      const formOriginData = this.getFormData()
      this.formData = formOriginData
      this.$emit('resetBtnClick')
    },
    // 搜索
    handleSearchClick() {
      this.$emit('submitBtnClick', this.formData)
    }
  }
}
</script>

<style scoped></style>
