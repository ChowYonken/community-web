export const searchFormConfig = {
  labelWidth: '120px',
  itemLayout: {
    padding: '10px 40px'
  },
  colLayout: {
    xl: 6, // 24 / 6 = 4
    lg: 8, // 3
    md: 12, // 2
    sm: 24, // 1
    xs: 24 // 1
  },
  btnStyle: {
    center: 'right',
    padding: '0 50px 20px 0'
  },
  labelPosition: 'right',
  title: '高级检索',
  btn: {
    search: {
      icon: 'el-icon-search',
      name: '搜索'
    },
    reset: {
      icon: 'el-icon-refresh',
      name: '重置'
    }
  },
  formItems: [
    {
      field: 'outTemp',
      type: 'input',
      label: '超出温度',
      placeholder: '请输入超出温度'
    },
    {
      field: 'status',
      type: 'select',
      label: '体温状况',
      placeholder: '请选择状况',
      options: [
        {
          label: '发烧',
          value: '0'
        },
        {
          label: '正常',
          value: '1'
        }
      ]
    }
  ]
}
