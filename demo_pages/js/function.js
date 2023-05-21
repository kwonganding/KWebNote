
//call/apply的实现

Function.prototype.call = function (thisArg, ...args) {
  thisArg ??= window;
  const fn = Symbol();
  thisArg[fn] = this;
  let res = thisArg[fn](...args);
  delete thisArg[fn]
  return res;
}

Function.prototype.kapply = function (thisArg, argArray) {
  thisArg ??= window;
  const fn = Symbol();
  thisArg[fn] = this;
  let res = thisArg[fn](...argArray);
  delete thisArg[fn]
  return res;
}


function instanceOf(obj, constructor) {
  let proto = obj.__proto__;
  if (proto) {
    if (proto === constructor.prototype)
      return true;
    else
      return instanceOf(proto, constructor)
  }
  else
    return false;
}

//如有循环引用该怎么办?

function deepClone(target, hash = new WeakMap()) {
  //值类型直接返回
  if (target === null || typeof target !== 'object')
    return target;
  //对象属性值都放入map中,避免循环引用
  if (hash.get(target))
    return hash.get(target);
  // 兼容数组
  let newObj = Array.isArray(target) ? [] : {};
  hash.set(target, newObj);
  for (let key in target) {
    //只处理自己的一级属性，过滤原型继承的
    if (!target.hasOwnProperty(key)) return;
    // 值类型直接赋值，引用类型递归
    if (target === null || typeof target !== 'object')
      newObj[key] = target[key];
    else
      newObj[key] = deepClone(target, hash);
  }
  return newObj;
}




//计算薪资的服务，根据员工绩效等级（A、B、C）计算薪资
const salaryCenter = {
  //计算薪资
  getSalary(value, mode) {
    return this[mode]();
  },
  //添加绩效等级及其策略
  addStrategy(mode, strategyFunc) {
    this[mode] = strategyFunc;
  }
}
//添加不同绩效等级的策略，这就是对扩展开放
salaryCenter.addStrategy('A', function (value) {
  return money * 1.2;
});
salaryCenter.addStrategy('B', function (value) {
  return money * 1;
});
salaryCenter.addStrategy('C', function (value) {
  return money - 200;
});

//消息中心
class EventCenter {
  constructor() {
    this.task = {};
  }
  //订阅消息，注册消息处理回调
  registry(type, func) {
    this.task[type] ??= [];
    //支持重复注册
    this.task[type].push(func);
  }
  // 发送消息，触发消息回调的执行
  emit(type, ...args) {
    if (!this.task[type]) return;
    this.task[type].forEach(func => {
      func.apply(this, args);
    })
  }
}

//工厂模式
class AnimateFactory {
  static Create(type) {
    switch (type) {
      case 'bird':
        return new Bird();
      case 'duck':
        return new Duck();
      default:
        console.log('type not exist:' + type);
    }
  }
}

//构造树形结构
//数据
const data = [
  { "id": 1, "name": "用户中心", "sort": 1, "pid": 0 },
  { "id": 2, "name": "订单中心", "sort": 2, "pid": 0 },
  { "id": 3, "name": "系统管理", "sort": 3, "pid": 0 },

  { "id": 12, "name": "所有订单", "sort": 1, "pid": 2 },
  { "id": 14, "name": "待发货", "sort": 1.2, "pid": 2 },
  { "id": 15, "name": "订单导出", "sort": 2, "pid": 2 },

  { "id": 18, "name": "菜单设置", "sort": 1, "pid": 3 },
  { "id": 19, "name": "权限管理", "sort": 2, "pid": 3 },
  { "id": 21, "name": "系统权限", "sort": 1, "pid": 19 },
  { "id": 22, "name": "角色设置", "sort": 2, "pid": 19 },
];





