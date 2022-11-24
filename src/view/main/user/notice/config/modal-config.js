export const modalConfig = {
  title: '用户',
  colLayout: { span: 24 },
  itemLayout: {},
  labelWidth: '60px',
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
