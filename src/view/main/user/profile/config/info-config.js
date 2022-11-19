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
  rules: {
    realname: [
      { required: true, message: '请输入活动名称', trigger: 'blur' },
      { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    ],
    cellphone: [
      { required: true, message: '请输入电话号码', trigger: 'blur' },
      { min: 11, max: 11, message: '长度在 11 个字符', trigger: 'blur' }
    ],
    address: [
      {
        required: true,
        message: '请输入详细地址(省/市/县或区/具体小区和门牌)',
        trigger: 'blur'
      }
    ]
  },
  formItems: [
    {
      field: 'account',
      type: 'input',
      label: '住户账号',
      disabled: true
    },
    {
      field: 'realname',
      type: 'input',
      label: '住户姓名',
      placeholder: '请输入住户姓名'
    },
    {
      field: 'cellphone',
      type: 'input',
      label: '电话号码',
      placeholder: '请输入电话号码'
    },
    {
      field: 'address',
      type: 'input',
      label: '家庭住址',
      placeholder: '请输入详细地址(省/市/县或区/具体小区和门牌)'
    },
    {
      field: 'createTime',
      type: 'datetime',
      label: '创建时间',
      readonly: true,
      disabled: true
    },
    {
      field: 'updateTime',
      type: 'datetime',
      label: '修改时间',
      readonly: true,
      disabled: true
    }
  ]
}
