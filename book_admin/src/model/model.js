export function Book() {
  this.id = "";
  this.name = "";
  this.author = "";
  this.introduction = "";
  this.imgs = '';
  this.price = 0;
  this.status = 'normal';
  this.tag = '';
}

export const bookRules = {
  name: [{ required: true, message: '必填', trigger: 'blur' }],
  author: [{ required: true, message: '必填', trigger: 'blur' }],
  price: [{ type:'number',min: 0, max: 99999, message: '价格应该为0到99999的数值', trigger: 'change' }],
}

function User() {
  this.id = '';
  this.name = '';
  this.img = '';
}

// 主题配置，极简
export const themas = [
  { name: "靛青", backgroundColor: '#177CB0', color: '#FFF' },
  { name: "橘黄", backgroundColor: '#FF8936', color: '#FFF' },
  { name: "酱紫", backgroundColor: '#d0378d', color: '#FFF' },
  { name: "珍珠", backgroundColor: '#EEE', color: '#333' },
  { name: "玄青", backgroundColor: '#3D3B4F', color: '#EEE' },
  { name: "葱青", backgroundColor: '#0EB83A', color: '#EEE' },
]

// 用户配置
export let userConfig = {
  routerAnimation: true,
  menuCollapse: false,
  language: 'cn',
  thema: themas[0],
}


