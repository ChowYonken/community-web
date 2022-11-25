export const contentTableConfig = {
  title: '公告列表',
  newBtnTitle: '新建用户',
  propList: [
    { prop: 'title', label: '标题', minWidth: '100' },
    { prop: 'content', label: '内容', minWidth: '100' },
    { prop: 'priority', label: '程度', minWidth: '100', slotName: 'priority' },
    { prop: 'createAt', label: '创建时间', minWidth: '250' },
    { prop: 'updateAt', label: '更新时间', minWidth: '250' },
    { label: '操作', width: '120', slotName: 'handler' }
  ],
  showIndexColumn: true,
  showSelectColumn: true,
  showAddBtn: true
}
