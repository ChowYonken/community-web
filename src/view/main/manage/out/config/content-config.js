export const contentTableConfig = {
  title: '外出人员列表',
  newBtnTitle: '新建外出',
  propList: [
    { prop: 'userInfo', label: '住户', minWidth: '100', slotName: 'userInfo' },
    { prop: 'start', label: '起始地', minWidth: '100' },
    { prop: 'end', label: '目的地', minWidth: '100' },
    { prop: 'startTime', label: '出发时间', minWidth: '130' },
    { prop: 'endTime', label: '到达时间', minWidth: '130' },
    { prop: 'transportation', label: '交通工具', minWidth: '100' },
    { prop: 'createAt', label: '创建时间', minWidth: '180' },
    { prop: 'updateAt', label: '更新时间', minWidth: '180' },
    { label: '操作', width: '120', slotName: 'handler' }
  ],
  showIndexColumn: true,
  showSelectColumn: false,
  showAddBtn: false
}
