<template>
  <div class="info">
    <ck-form v-bind="infoFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">个人信息</h1>
      </template>
      <template #footer>
        <div :style="`text-align: ${infoFormConfig.btnStyle.center}`">
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="handleSearchClick"
            >提交</el-button
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
    infoFormConfig: {
      type: Object,
      require: true
    },
    defaultInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      formItems: this.infoFormConfig.formItems ?? []
    }
  },
  created() {},
  computed: {
    formData: {
      get() {
        const formOriginData = this.getFormData()
        return formOriginData
      },
      set(val) {
        return val
      }
    }
  },
  methods: {
    getFormData() {
      const formOriginData = {}
      for (const item of this.formItems) {
        formOriginData[item.field] = this.defaultInfo[item.field]
      }
      return formOriginData
    },
    handleSearchClick() {
      this.$emit('submitBtnClick', this.formData)
    }
  }
}
</script>

<style scoped></style>
