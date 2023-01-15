function Book() {
  this.id = "";
  this.name = "";
  this.author = "";
  this.introduction = "";
  this.imgs = [];
  this.status = '';
}

const bookRules = {

}

function User() {
  this.id = '';
  this.name = '';
  this.img = '';
}

const themas = [
  { name: "靛青", backgroundColor: '#177CB0', color: '#FFF' },
  { name: "橘黄", backgroundColor: '#FF8936', color: '#FFF' },
  { name: "酱紫", backgroundColor: '#d0378d', color: '#FFF' },
  { name: "珍珠", backgroundColor: '#EEE', color: '#333' },
  { name: "玄青", backgroundColor: '#3D3B4F', color: '#EEE' },
  { name: "葱青", backgroundColor: '#0EB83A', color: '#EEE' },
]

// 用户配置
let userConfig = {
  routerAnimation: true,
  menuCollapse: false,
  language: 'cn',
  thema: themas[0],
}



export { Book, User, userConfig, themas }