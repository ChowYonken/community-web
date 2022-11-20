<template>
  <div class="form">
    <!-- 标题 -->
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form
      :label-position="labelPosition"
      :label-width="labelWidth"
      :model="modValue"
      :rules="rules"
    >
      <el-row>
        <template v-for="item in formItems">
          <el-col v-bind="colLayout">
            <el-form-item
              :label="item.label"
              :style="itemLayout"
              :prop="item.field"
            >
              <!-- input表单 -->
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :show-password="item.type === 'password'"
                  :style="`width: ${inputStyle}`"
                  :disabled="item.disabled"
                  v-model="modValue[`${item.field}`]"
                >
                </el-input>
              </template>
              <!-- select表单 -->
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :style="`width: ${inputStyle}`"
                  v-model="modValue[`${item.field}`]"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  ></el-option>
                </el-select>
              </template>
              <!-- radio单选框 -->
              <template v-else-if="item.type === 'radio'">
                <div>
                  <el-radio-group v-model="modValue[`${item.field}`]">
                    <template v-for="o in item.options">
                      <el-radio :label="o.label" :key="o.label">
                        {{ o.value }}
                      </el-radio>
                    </template>
                  </el-radio-group>
                </div>
              </template>
              <!-- datepicker表单 -->
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  v-bind="item.otherOptions"
                  :style="`width: ${inputStyle}`"
                  v-model="modValue[`${item.field}`]"
                ></el-date-picker>
              </template>
              <!-- datetimepicker表单 -->
              <template v-else-if="item.type === 'datetime'">
                <el-date-picker
                  :type="item.type"
                  :style="`width: ${inputStyle}`"
                  v-model="modValue[`${item.field}`]"
                  :readonly="item.readonly"
                  :disabled="item.disabled"
                >
                </el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <!-- 操作按钮 -->
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'modelValue',
    event: 'update:modelValue'
  },
  props: {
    modelValue: {
      type: Object,
      require: true
    },
    formItems: {
      type: Array,
      default() {
        return []
      }
    },
    labelPosition: {
      type: String,
      default: 'right'
    },
    labelWidth: {
      type: String,
      dafault: '100px'
    },
    itemLayout: {
      type: Object,
      default: () => ({ padding: '10px 40px' })
    },
    colLayout: {
      type: Object,
      default() {
        return {
          xl: 6,
          lg: 8,
          md: 12,
          sm: 24,
          xs: 24
        }
      }
    },
    inputStyle: {
      type: String,
      default: '100%'
    },
    rules: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      modValue: this.modelValue
    }
  },
  watch: {
    modValue(value) {
      this.$emit('update:modelValue', this.modValue)
    }
  }
}
</script>

<style scoped></style>
