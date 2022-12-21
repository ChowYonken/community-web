export const modalConfig = {
  title: '设备',
  colLayout: { span: 24 },
  itemLayout: {},
  labelWidth: '100px',
  rules: {
    name: [{ required: true, message: '请填写设备名', trigger: 'blur' }],
    status: [{ required: true, message: '请选择状况', trigger: 'blur' }],
    others: [{ required: true, message: '请输入其他', trigger: 'blur' }],
    realname: [{ required: true, message: '请输入住户名', trigger: 'blur' }]
  },
  formItems: [
    {
      field: 'name',
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
    },
    {
      field: 'others',
      type: 'input',
      label: '其他',
      placeholder: '请输入其他'
    },
    {
      field: 'realname',
      type: 'input',
      label: '住户名',
      placeholder: '请输入住户名'
    }
  ]
}
