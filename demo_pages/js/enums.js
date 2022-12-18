//枚举构造器，提供的属性：
// keys：枚举的key集合[key]
// texts：枚举的文本text集合[text]
// values：枚举的数值value集合[value]
// entries：枚举的key、text、value集合[{key,text,value}]
// tableFormater：element中表格绑定枚举数据文本的formatter函数
function EnumFactory(enumObj) {
    //复制（继承）enumObj
    Object.assign(this, enumObj);

    // keys：枚举的key集合[key]
    Object.defineProperty(this, 'keys', {
        value: Object.keys(enumObj)
    });
    //处理texts、values、entries    
    let values = [], texts = [], entries = [];
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
            entries.push({ key: this.keys[index], text: item.text, value: item.value });
        })
    }

    // texts：枚举的文本text集合[text]
    Object.defineProperty(this, 'texts', { value: texts });

    // values：枚举的数值value集合[value]
    Object.defineProperty(this, 'values', { value: values });

    // entries：枚举的key、text、value集合[{key,text,value}]
    Object.defineProperty(this, 'entries', { value: entries });

    // tableFormater：element中表格绑定枚举数据文本的formatter函数
    Object.defineProperty(this, 'tableFormater', {
        value: function (r, c, value) {
            return entries.filter(v => v.key === value || v.value === value)[0]?.text || 'notfound';
        }
    });

    //枚举定义的数据都是常量，不可修改，冻结一下
    Object.freeze(this);
}

//********************** 定义项目公共枚举 ********************** */

//性别枚举：key、text模式
// const enumSex = new EnumFactory({ male: '男', female: '女', other: '其他' });
//性别枚举：key、text、value模式
const enumSex = new EnumFactory({ male: { text: '男', value: 1 }, female: { text: '女', value: 2 } });
//水平对齐
const enumAlign = new EnumFactory({ left: '左对齐', center: '居中', right: '右对齐' });
//用户状态
const enumUserStatus = new EnumFactory({ default: '正常', delete: '删除', lock: '锁定' });

//**********************  export  ********************** */
export { enumSex, enumAlign, enumUserStatus }

//test
console.log(enumSex.keys);
console.log(enumSex.texts);
console.log(enumSex.values);
console.log(JSON.stringify(enumSex.entries));

// ['male', 'female']
// ['男', '女']
// [1, 2]
// [{"key":"male","text":"男","value":1},{"key":"female","text":"女","value":2}]