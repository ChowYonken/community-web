export const modalConfig = {
  title: '密码',
  colLayout: { span: 24 },
  itemLayout: {},
  labelWidth: '100px',
  rules: {
    oldPwd: [
      { required: true, message: '请输入旧密码', trigger: 'blur' },
      {
        min: 3,
        max: 10,
        message: '请输出 3 ~ 10 个字符的密码',
        trigger: 'blur'
      }
    ],
    newPwd: [
      { required: true, message: '请输入新密码', trigger: 'blur' },
      {
        min: 3,
        max: 10,
        message: '请输出 3 ~ 10 个字符的密码',
        trigger: 'blur'
      }
    ],
    checkPwd: [
      { required: true, message: '请再次输入密码', trigger: 'blur' },
      {
        min: 3,
        max: 10,
        message: '请输出 3 ~ 10 个字符的密码',
        trigger: 'blur'
      }
    ]
  },
  formItems: [
    {
      field: 'oldPwd',
      type: 'password',
      label: '旧密码',
      placeholder: '请输入旧密码'
    },
    {
      field: 'newPwd',
      type: 'password',
      label: '新密码',
      placeholder: '请输入新密码'
    },
    {
      field: 'checkPwd',
      type: 'password',
      label: '确认密码',
      placeholder: '请输入确认密码'
    }
  ]
}
