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
      field: 'realname',
      type: 'input',
      label: '真实姓名',
      placeholder: '请输入真实姓名'
    },
    {
      field: 'end',
      type: 'input',
      label: '目的地',
      placeholder: '请输入目的地'
    },
    {
      field: 'timeRange',
      type: 'datepicker',
      label: '时间范围',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange',
        format: 'yyyy 年 MM 月 dd 日',
        valueFormat: 'yyyy-MM-dd'
      }
    }
  ]
}
