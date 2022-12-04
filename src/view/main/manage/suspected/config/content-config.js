export const contentTableConfig = {
  title: '疑似人员列表',
  propList: [
    { prop: 'account', label: '账号', minWidth: '120' },
    { prop: 'realname', label: '真实姓名', minWidth: '100' },
    {
      prop: 'cellphone',
      label: '电话号码',
      minWidth: '120'
    },
    {
      prop: 'address',
      label: '地址',
      minWidth: '120'
    },
    {
      prop: 'suspected',
      label: '疑似人员',
      minWidth: '100',
      slotName: 'suspected'
    }
  ],
  showIndexColumn: true,
  showSelectColumn: false,
  showAddBtn: false
}
