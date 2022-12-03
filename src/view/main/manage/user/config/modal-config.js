export const modalConfig = {
  title: '用户',
  colLayout: { span: 24 },
  itemLayout: {},
  labelWidth: '100px',
  rules: {
    account: [{ required: true, message: '请填写账号', trigger: 'blur' }],
    password: [{ required: true, message: '请填写密码', trigger: 'blur' }],
    realname: [{ required: true, message: '请填写真实姓名', trigger: 'blur' }],
    cellphone: [{ required: true, message: '请填写电话号码', trigger: 'blur' }],
    address: [{ required: true, message: '请填写地址', trigger: 'blur' }]
  },
  formItems: [
    {
      field: 'account',
      type: 'input',
      label: '账号',
      placeholder: '请输入账号'
    },
    {
      field: 'password',
      type: 'password',
      label: '密码',
      placeholder: '请输入密码',
      isHidden: false
    },
    {
      field: 'realname',
      type: 'input',
      label: '真实姓名',
      placeholder: '请输入真实姓名'
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
      label: '地址',
      placeholder: '请输入地址'
    }
  ]
}
