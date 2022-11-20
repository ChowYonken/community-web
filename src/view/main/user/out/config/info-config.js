export const infoFormConfig = {
  labelWidth: '400px',
  itemLayout: {
    padding: '10px 40px'
  },
  colLayout: {
    span: 24
  },
  inputStyle: '50%',
  btnStyle: {
    center: 'center',
    padding: '0 50px 20px 0'
  },
  labelPosition: 'top',
  title: '外出报备',
  btn: {
    search: {
      icon: 'el-icon-edit',
      name: '提交'
    },
    reset: {
      icon: 'el-icon-refresh',
      name: '重置'
    }
  },
  rules: {
    start: [
      { required: true, message: '请填写你需要出发的城市', trigger: 'blur' }
    ],
    end: [
      { required: true, message: '请填写你需要到达的城市', trigger: 'blur' }
    ],
    timeRange: [
      { required: true, message: '请填写你的外出时长', trigger: 'blur' }
    ],
    transportation: [
      { required: true, message: '请选择外出的交通工具', trigger: 'blur' }
    ]
  },
  formItems: [
    {
      field: 'start',
      type: 'input',
      label: '出发城市',
      placeholder: '请填写你的出发城市(详细地址)'
    },
    {
      field: 'end',
      type: 'input',
      label: '终点城市',
      placeholder: '请填写你的终点城市(详细地址)'
    },
    {
      field: 'timeRange',
      type: 'datepicker',
      label: '外出时长',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange',
        rangeSeparator: '至',
        format: 'yyyy 年 MM 月 dd 日',
        valueFormat: 'yyyy-MM-dd'
      }
    },
    {
      field: 'transportation',
      type: 'select',
      label: '交通工具',
      options: [
        {
          label: '飞机',
          value: '飞机'
        },
        {
          label: '高铁',
          value: '高铁'
        },
        {
          label: '火车',
          value: '火车'
        },
        {
          label: '汽车',
          value: '汽车'
        },
        {
          label: '自驾',
          value: '自驾'
        }
      ]
    }
  ]
}
