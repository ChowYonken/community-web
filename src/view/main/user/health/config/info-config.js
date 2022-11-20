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
  title: '健康申报',
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
    homeTemp: [
      { required: true, message: '请填写你今日的体温', trigger: 'blur' }
    ],
    status: [
      { required: true, message: '请填写你的身体状况', trigger: 'blur' }
    ],
    riskAreas: [
      {
        required: true,
        message: '请填写你近14天是否到达过高风险地区',
        trigger: 'blur'
      }
    ],
    healthCode: [
      { required: true, message: '请填写你的健康码颜色', trigger: 'blur' }
    ]
  },
  formItems: [
    {
      field: 'homeTemp',
      type: 'input',
      label: '今日你的体温是多少？',
      placeholder: '请输入您今日的体温'
    },
    {
      field: 'status',
      type: 'radio',
      label: '今日你的身体状况是？',
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
      type: 'radio',
      label: '近14天是否到达高风险地区？',
      options: [
        {
          label: 0,
          value: '否'
        },
        {
          label: 1,
          value: '是'
        }
      ]
    },
    {
      field: 'healthCode',
      type: 'radio',
      label: '近14天是否到达高风险地区？',
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
      placeholder: '其他补充'
    }
  ]
}
