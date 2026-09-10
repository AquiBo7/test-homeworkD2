const rawExpenses = [
  { id: 1, date: '2026-03-01', category: '餐饮', amount: 28.5, title: '  食堂早餐  ' },
  { id: 2, date: '2026-03-01', category: '数码', amount: 199.0, title: '机械键盘' },
  { id: 3, date: '2026-03-02', category: '交通', amount: 4.0, title: '地铁出行' },
  { id: 4, date: '2026-03-02', category: '餐饮', amount: 45.0, title: '午餐外卖' },
  { id: 5, date: '2026-03-03', category: '生活', amount: 15.8, title: '纸巾日用品' },
  { id: 6, date: '2026-03-03', category: '餐饮', amount: -35.0, title: '异常负数账单' },
  { id: 7, date: '2026/03/04', category: '娱乐', amount: 60.0, title: '电影票' },
  { id: 8, date: '2026-03-05', category: '数码', amount: 'abc', title: '无效金额' }
];

console.table(rawExpenses);