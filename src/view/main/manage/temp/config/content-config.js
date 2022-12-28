export const contentTableConfig = {
  title: '体温列表',
  newBtnTitle: '新建用户',
  propList: [
    { prop: 'outTemp', label: '外出温度', minWidth: '120' },
    {
      prop: 'userInfo',
      label: '住户信息',
      minWidth: '120',
      slotName: 'userInfo'
    },
    {
      prop: 'deviceInfo',
      label: '设备名',
      minWidth: '120',
      slotName: 'deviceInfo'
    },
    { prop: 'status', label: '状态', minWidth: '120', slotName: 'status' },
    { prop: 'createAt', label: '创建时间', minWidth: '180' }
  ],
  showIndexColumn: true,
  showSelectColumn: false,
  showAddBtn: false
}
