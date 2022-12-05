export const modalConfig = {
  title: '外出',
  colLayout: { span: 24 },
  itemLayout: {},
  labelWidth: '100px',
  formItems: [
    {
      field: 'start',
      type: 'input',
      label: '起始地',
      placeholder: '请输入起始地'
    },
    {
      field: 'end',
      type: 'input',
      label: '目的地',
      placeholder: '请输入目的地'
    },
    {
      field: 'startTime',
      type: 'datetime',
      label: '起始时间',
      placeholder: '请选择起始时间'
    },
    {
      field: 'endTime',
      type: 'datetime',
      label: '结束时间',
      placeholder: '请选择结束时间'
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
