//constants.js存放一些全局变量

import EnumFactory from '../../../util/js/enumfactory'

export default {
  sysName: '图书管理系统',
  footer: 'BookAdmin Copyright @ by Kwong',

  ////////业务变量
  //书籍状态枚举
  bookStatus: new EnumFactory({ normal: { text: '正常', type: 'success' }, disable: { text: '下架', type: 'warning' } }),
  //订单状态枚举
  orderStatus: new EnumFactory({
    unpay: { text: '未支付', type: 'warning' },
    canceled: { text: '已取消', type: 'danger' },
    done: { text: '已完成', type: 'success' }
  }),
}

//❓直接赋值枚举值，需输入字符串，易出错
//this.book.status = 'normal';
//js中不好解决，提示输入也是个问题，还有语法校验也不好做。可以试试TS


