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

const cleanExpenses = (list) => list.filter(item => {
  const isDate = /^\d{4}-\d{2}-\d{2}$/.test(item.date);
  const isAmount = typeof item.amount === 'number' && item.amount > 0;
  return isDate && isAmount;
});

const average = (list) => {
  if (list.length === 0) return 0;
  const total = list.reduce((sum, item) => sum + item.amount, 0);
  return (total / list.length).toFixed(2);
};

const highest = (list) => list.reduce((max, item) => item.amount > max.amount ? item : max, list[0]);

const largeExpenses = (list) => list.filter(item => item.amount >= 50).map(item => item.title);

console.log('清洗后：', cleanExpenses(rawExpenses));
console.log('平均消费：', average(cleanExpenses(rawExpenses)));
console.log('最高消费：', highest(cleanExpenses(rawExpenses)));
console.log('大额支出：', largeExpenses(cleanExpenses(rawExpenses)));

const categoryCount = (list) => {
  const result = { 餐饮: 0, 数码: 0, 交通: 0, 生活: 0, 其他: 0 };
  list.forEach(item => {
    if (result[item.category] !== undefined) {
      result[item.category]++;
    } else {
      result.其他++;
    }
  });
  return result;
};

const sortExpenses = (list) => [...list].sort((a, b) => {
  if (a.category !== b.category) {
    return a.category > b.category ? 1 : -1;
  }
  return b.amount - a.amount;
});

const report = (list) => {
  const valid = cleanExpenses(list);
  if (valid.length === 0) {
    return '没有有效账单';
  }
  const dist = categoryCount(valid);
  const maxItem = highest(valid);
  return `有效账单${valid.length}笔，平均每笔${average(valid)}元，最高单笔${maxItem.amount}元（${maxItem.title}）；类别分布：餐饮${dist.餐饮}笔 数码${dist.数码}笔 交通${dist.交通}笔 生活${dist.生活}笔；大额支出：${largeExpenses(valid).join('、') || '无'}`;
};

try {
  console.log(report(rawExpenses));
  console.log('双字段排序结果：', sortExpenses(cleanExpenses(rawExpenses)));
  console.log('空数据防御测试：', report([]));
} catch (err) {
  console.error('报告生成失败：', err.message);
}

const testList = [];
for (let i = 0; i < 10000; i++) {
  testList.push({ amount: 10 });
}

console.time('for循环耗时');
let totalFor = 0;
for (let i = 0; i < testList.length; i++) {
  totalFor += testList[i].amount;
}
console.timeEnd('for循环耗时');

console.time('reduce耗时');
const totalReduce = testList.reduce((sum, item) => sum + item.amount, 0);
console.timeEnd('reduce耗时');