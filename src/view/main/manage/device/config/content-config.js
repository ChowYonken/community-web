export const contentTableConfig = {
  title: '设备列表',
  newBtnTitle: '新建设备',
  propList: [
    { prop: 'name', label: '设备名', minWidth: '120' },
    {
      prop: 'userInfo',
      label: '住户信息',
      minWidth: '120',
      slotName: 'userInfo'
    },
    { prop: 'status', label: '状态', minWidth: '120', slotName: 'status' },
    { prop: 'others', label: '其他', minWidth: '180' },
    { prop: 'createAt', label: '创建时间', minWidth: '180' },
    { label: '操作', width: '120', slotName: 'handler' }
  ],
  showIndexColumn: true,
  showSelectColumn: false,
  showAddBtn: true
}
