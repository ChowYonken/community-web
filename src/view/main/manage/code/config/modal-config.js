export const modalConfig = {
  title: '健康',
  colLayout: { span: 24 },
  itemLayout: {},
  labelWidth: '100px',
  formItems: [
    {
      field: 'homeTemp',
      type: 'input',
      label: '自测温度',
      placeholder: '请输入自测温度(不需要输入单位)'
    },
    {
      field: 'status',
      type: 'select',
      label: '身体状况',
      placeholder: '请选择身体状况',
      options: [
        {
          label: '健康',
          value: '健康'
        },
        {
          label: '发烧',
          value: '发烧'
        },
        {
          label: '干咳',
          value: '干咳'
        },
        {
          label: '乏力',
          value: '乏力'
        }
      ]
    },
    {
      field: 'riskAreas',
      type: 'select',
      label: '高风险地区',
      placeholder: '请选择高风险地区',
      options: [
        {
          label: '否',
          value: '0'
        },
        {
          label: '是',
          value: '1'
        }
      ]
    },
    {
      field: 'healthCode',
      type: 'select',
      label: '健康码',
      options: [
        {
          label: '绿码',
          value: '绿码'
        },
        {
          label: '黄码',
          value: '黄码'
        },
        {
          label: '红码',
          value: '红码'
        }
      ]
    },
    {
      field: 'others',
      type: 'input',
      label: '其他',
      placeholder: '请输入其他'
    }
  ]
}
