//数据字典的数据

// import api from './api'
import api from './mockapi.js';

const ROOT_PID = 0;

//************ TYPES

export const TYPES = {
  bookTag: 'bookTag',
  bookType: 'bookType',
}

//************ cascaderOption

export const cascaderOption = { value: 'id', label: 'name', emitPath: false, checkStrictly: true, disabled: 'disabled' };

//************  queryDicData

// type: 字典类型编码code
// istree：字典数据是否树形结构，如果是树形结构则会构造树形
export function queryDicData(type, istree = false) {
  return api.dicdata({ code: type }).then(res => {
    if (!res.data || res.data.length <= 0) return [];
    //构造树形结构
    if (!istree)
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

// 编辑数据时，级联选项中不能选择自己及自己的子级
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
