//数据字典的数据

import api from './api'

const ROOT_PID = 0;

export const cascaderOption = { value: 'id', label: 'name', emitPath: false, checkStrictly: true, disabled: 'disabled' };

//************  queryDicData

export function queryDicData(item) {
  return api.dicdata({ code: item.code }).then(res => {
    if (!res.data || res.data.length <= 0) return [];
    //构造树形结构
    if (!item.tree)
      return res.data.sort(sortDicData);
    let sortItems = buildDicTree(res.data, ROOT_PID);
    return sortItems;
  })
}
function buildDicTree(items, pid) {
  let sortItems = items.filter(s => s.pid == pid);
  if (!sortItems || sortItems.length <= 0) return [];
  sortItems.sort(sortDicData).forEach(item => {
    const res = buildDicTree(items, item.id);
    if (res && res.length > 0)
      item.children = res.sort(sortDicData);
  });
  return sortItems;
}
function sortDicData(item1, item2) {
  return item1.sort - item2.sort;
}

//************  updateTreeDisabled

// 编辑数据是，级联选项中不能选择自己及自己的子级
export function updateTreeDisabled(items, currentItem) {
  //重置
  setDisabled(items, false);
  if (!currentItem)
    return;
  currentItem.disabled = true;
  setDisabled(currentItem.children, true);
}

//要遍历所有节点，修复 disabled 属性
function setDisabled(items, value) {
  if (!items || items.length <= 0) return;
  items.forEach(item => {
    item.disabled = value;
    setDisabled(item.children, value);
  })
}
