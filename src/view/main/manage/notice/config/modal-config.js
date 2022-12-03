export const modalConfig = {
  title: '公告',
  colLayout: { span: 24 },
  itemLayout: {},
  labelWidth: '60px',
  rules: {
    title: [{ required: true, message: '请填写标题', trigger: 'blur' }],
    content: [{ required: true, message: '请填写内容', trigger: 'blur' }],
    priority: [{ required: true, message: '请选择公告程度', trigger: 'blur' }]
  },
  formItems: [
    {
      field: 'title',
      type: 'input',
      label: '标题',
      placeholder: '请输入标题'
    },
    {
      field: 'content',
      type: 'textarea',
      label: '内容',
      placeholder: '请输入内容'
    },
    {
      field: 'priority',
      type: 'select',
      label: '程度',
      options: [
        {
          label: '紧急',
          value: '1'
        },
        {
          label: '普通',
          value: '2'
        }
      ]
    }
  ]
}
