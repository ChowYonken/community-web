export const contentTableConfig = {
  title: '用户列表',
  newBtnTitle: '新建用户',
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
    },
    {
      prop: 'role',
      label: '角色',
      minWidth: '100',
      slotName: 'role'
    },
    { prop: 'createTime', label: '创建时间', minWidth: '180' },
    { prop: 'updateTime', label: '更新时间', minWidth: '180' },
    { label: '操作', width: '120', slotName: 'handler' }
  ],
  showIndexColumn: true,
  showSelectColumn: false,
  showAddBtn: true
}
