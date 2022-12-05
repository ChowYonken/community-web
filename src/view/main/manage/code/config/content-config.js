export const contentTableConfig = {
  title: '健康列表',
  newBtnTitle: '新建健康',
  propList: [
    { prop: 'userInfo', label: '住户', minWidth: '100', slotName: 'userInfo' },
    {
      prop: 'homeTemp',
      label: '自测温度',
      minWidth: '100',
      slotName: 'homeTemp'
    },
    { prop: 'status', label: '状态', minWidth: '100', slotName: 'status' },
    {
      prop: 'riskAreas',
      label: '高风险地区',
      minWidth: '100',
      slotName: 'riskAreas'
    },
    {
      prop: 'healthCode',
      label: '健康码',
      minWidth: '100',
      slotName: 'healthCode'
    },
    {
      prop: 'others',
      label: '其他',
      minWidth: '180'
    },
    {
      prop: 'createTime',
      label: '创建时间',
      minWidth: '180'
    },
    { label: '操作', width: '120', slotName: 'handler' }
  ]
}
