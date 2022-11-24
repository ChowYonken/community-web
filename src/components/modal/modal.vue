<template>
  <div class="modal">
    <el-dialog
      :visible.sync="openDialog"
      :title="dialogTitle + `${modalConfig.title}`"
      width="30%"
      append-to-body
      center
      destroy-on-close
    >
      <ck-form v-model="formData" v-bind="modalConfig"></ck-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelDiaog">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import CkForm from '@/base-ui/form/form.vue'

export default {
  components: {
    CkForm
  },
  props: {
    modalConfig: {
      type: Object,
      require: true
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    dialogTitle: {
      type: String,
      require: true
    },
    editData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      formItems: this.modalConfig.formItems ?? [],
      formOriginData: {},
      formData: {}
    }
  },
  computed: {
    openDialog: {
      get() {
        return this.dialogVisible
      },
      set(val) {
        this.$emit('changeDialog', val)
      }
    }
  },
  watch: {
    formOriginData: {
      handler(newValue, oldValue) {
        this.formData = newValue
      },
      deep: true
    }
  },
  methods: {
    // 添加
    getFormData() {
      // 通过配置文件的field来获取formData里面有什么类型
      for (const item of this.formItems) {
        // 使用$set将设为响应式
        this.$set(this.formOriginData, item.field, '')
      }
    },
    // 编辑弹窗时需要映射出需要显示的字段
    editMapData(editData1) {
      for (const item of this.formItems) {
        // 使用$set将设为响应式
        this.$set(this.formOriginData, item.field, editData1[item.field])
      }
    },
    // 确认
    handleConfirmClick() {
      this.$emit('confirmDialog', this.formData)
    },
    // 取消
    cancelDiaog() {
      this.$emit('closeDialog')
    }
  }
}
</script>

<style scoped></style>
