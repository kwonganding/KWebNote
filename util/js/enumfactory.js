// 用于扩展一个枚举对象，方便访问枚举的编码、类型、文本

//枚举构造器***************************
//参数格式：enumObj
//简单格式：{ left: '左对齐', center: '居中', right: '右对齐' }
//完整格式：type为element中的类型：success/info/warning/danger	
//{ male: { text: '男', value: 1,type:'info' }, female: { text: '女', value: 2,type:'warning' }
//扩展的属性：
// keys：枚举的key集合[key]
// texts：枚举的文本text集合[text]
// types:type集合，同element中的样式状态type
// values：枚举的数值value集合[value]
// entries：枚举的key、text、value集合[{key,text,value,type}]
// tableFormater：element中表格绑定枚举数据文本的formatter函数
function EnumFactory(enumObj) {
  //复制（继承）enumObj
  Object.assign(this, enumObj);

  // keys：枚举的key集合[key]
  Object.defineProperty(this, 'keys', {
    value: Object.keys(enumObj)
  });
  //处理texts、values、entries    
  let values = [], texts = [], types = [], entries = [];
  const vobjs = Object.values(enumObj);
  if (typeof vobjs[0] === 'string') {
    texts = vobjs;
    vobjs.forEach((item, index) => {
      entries.push({ key: this.keys[index], text: texts[index] });
    })
  }
  else {
    vobjs.forEach((item, index) => {
      texts.push(item.text);
      values.push(item.value);
      types.push(item.type);
      entries.push({ key: this.keys[index], text: item.text, value: item.value, type: item.type });
    })
  }

  // texts：枚举的文本text集合[text]
  Object.defineProperty(this, 'texts', { value: texts });

  // values：枚举的数值value集合[value]
  Object.defineProperty(this, 'values', { value: values });

  // entries：枚举的key、text、value集合[{key,text,value}]
  Object.defineProperty(this, 'entries', { value: entries });

  // tableFormater：element中表格绑定枚举数据文本的formatter函数
  //r、c为行列，可传入null
  Object.defineProperty(this, 'tableFormater', {
    value: function (r, c, value) {
      return entries.filter(v => v.key === value || v.value === value)[0]?.text || 'notfound';
    }
  });

  //枚举定义的数据都是常量，不可修改，冻结一下
  Object.freeze(this);
}

export default EnumFactory;