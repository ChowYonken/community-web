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
      field: 'deviceName',
      type: 'input',
      label: '设备名',
      placeholder: '请输入设备名'
    },
    {
      field: 'status',
      type: 'select',
      label: '设备状况',
      placeholder: '请选择状况',
      options: [
        {
          label: '损坏',
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
