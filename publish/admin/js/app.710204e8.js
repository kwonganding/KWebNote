!function(){"use strict";var e,t,a,o={8638:function(e,t,a){let o=a(6943).Z.create({baseURL:".",timeout:9e3});o.URL={proxy:".",upload:"./upload",login:"/api/login",stats_base:"/api/stats_base",stats_order:"/api/stats_order",stats_user:"/api/stats_user",book_list:"/api/book/list",book_id:"/api/book/id",book_save:"/api/book/save",dictype:"/api/sys/dictype/list",dicdata:"/api/sys/dicdata/list",dicdata_save:"/api/sys/dicdata/save",dicdata_delete:"/api/sys/dicdata/delete",order_list:"/api/order/list",order_save:"/api/order/save"},o.interceptors.request.use((function(e){return e})),o.interceptors.response.use((e=>200===e.status&&"OK"===e.data?.status?Promise.resolve(e.data):Promise.reject(e.data?.message?e.data.message:e.status)),(e=>(console.error(e),Promise.reject(e.message)))),o.api=function(e){return Promise.resolve({data:[],total:10})},o.login=function(e){return Promise.resolve({status:"OK",message:"mock接口！登录成功",token:e.name})},o.stats_base=function(){return Promise.resolve({status:"OK",message:"mock接口！",data:{user:33224,book:1334,order:213,money:1552.24}})},o.stats_order=function(){return Promise.resolve({status:"OK",message:"mock接口！",data:[{name:"1月",value:33},{name:"2月",value:46},{name:"3月",value:245},{name:"4月",value:322},{name:"5月",value:78},{name:"6月",value:178},{name:"7月",value:278}]})},o.stats_user=function(){return Promise.resolve({status:"OK",message:"mock接口！",data:[{name:"1月",value:121},{name:"2月",value:146},{name:"3月",value:245},{name:"4月",value:478},{name:"5月",value:1278},{name:"6月",value:3450},{name:"7月",value:7890},{name:"8月",value:1e4},{name:"9月",value:24567}]})},o.book_list=function(e){return Promise.resolve({status:"OK",message:"mock接口！!",data:[{id:1,name:"深入理解C#(第3版)1",author:"Jon Skeet",tag:"买它！",price:1333.2,comments:1444,imgs:"/file/1676274037258-2.png,/file/1676274041436-è±¡.gif,/file/1676274045118-gif007.gif",status:"normal",lasttime:1676274046921},{id:2,name:"O'Reilly：框架设计（第3版）（影印版）",author:"[美] 瑞奇特 Jeffrey Richte\n",tag:"新上市",price:1333.2,comments:2223,imgs:"/file/1676274067754-wallhaven-5g7ew7.jpg",status:"normal",lasttime:1676274069315},{id:3,name:"项目管理知识体系指南",author:"[美] 项目管理协会",tag:"新上市",price:16,comments:11,imgs:"/file/1676274080582-klogo.png",status:"normal",lasttime:1676274081991}],total:33})},o.book_id=function(e){return Promise.resolve({status:"OK",message:"mock接口！!",data:{id:1,name:"深入理解C#(第3版)1",author:"Jon Skeet",tag:"买它！",price:1333.2,comments:1444,imgs:"/file/1676274037258-2.png,/file/1676274041436-è±¡.gif,/file/1676274045118-gif007.gif",status:"normal",lasttime:1676274046921}})},o.book_save=function(e){return Promise.resolve({status:"OK",message:"mock接口！!"})},o.dictype=function(){return Promise.resolve({status:"OK",message:"mock接口！!",data:[{id:1,code:"bookTag",name:"商品标签",tree:0},{id:2,code:"bookType",name:"书籍分类",tree:1}]})},o.dicdata=function(e){let t=[];switch(e.code){case"bookType":t=[{id:5,name:"科技",code:"bookType",sort:1,pid:0},{id:6,name:"计算机/网络",code:"bookType",sort:1,pid:5},{id:7,name:"人文历史",code:"bookType",sort:2,pid:0},{id:8,name:"医学12333",code:"bookType",sort:2,pid:5},{id:25,name:"小说",code:"bookType",sort:1,pid:7},{id:26,name:"历史",code:"bookType",sort:2,pid:7},{id:27,name:"宗教1",code:"bookType",sort:3.1,pid:0},{id:29,name:"佛教",code:"bookType",sort:3,pid:27},{id:30,name:"基督教",code:"bookType",sort:2,pid:27}];break;case"bookTag":t=[{id:1,name:"促销",code:"bookTag",sort:1,pid:0},{id:2,name:"热卖",code:"bookTag",sort:2,pid:0},{id:3,name:"新上市",code:"bookTag",sort:3,pid:0},{id:4,name:"买它！",code:"bookTag",sort:4,pid:0},{id:31,name:"售罄",code:"bookTag",sort:5,pid:0}]}return Promise.resolve({status:"OK",message:"mock接口！!",data:t})},o.dicdata_save=function(e){return Promise.resolve({status:"OK",message:"mock接口！!",data:[]})},o.dicdata_delete=function(e){return Promise.resolve({status:"OK",message:"mock接口！",data:[]})},o.order_list=function(e){return Promise.resolve({status:"OK",message:"mock接口！",data:[{id:1,uid:1,name:"admin",money:113,products:'[{"name":"论语","price":155,"total":1},{"name":"论语2","price":15,"total":2}]',status:"unpay",createtime:1675319639624},{id:2,uid:1,name:"admin",money:1334,products:'[{"name":"论语","price":155,"total":1},{"name":"论语2","price":15,"total":2}]',status:"canceled",createtime:1675319639624},{id:3,uid:2,name:"ading",money:333,products:'[{"name":"论语","price":155,"total":1},{"name":"论语2","price":15,"total":2}]',status:"done",createtime:1675319639624}],total:3})},t.Z=o},5844:function(e,t,a){var o=a(6369),n=a(1001),i=(0,n.Z)({},(function(){return(0,this._self._c)("router-view")}),[],!1,null,null,null).exports,s=a(3822),r=(a(7658),{namespaced:!0,state:{cacheRoutes:[],cacheNames:[]},mutations:{add(e,t){e.cacheRoutes.some((e=>e.path===t.path))||e.cacheRoutes.push({path:t.path,name:t.name,meta:t.meta}),e.cacheNames=e.cacheRoutes.map((e=>e.name))},remove(e,t){const a=e.cacheRoutes.findIndex((e=>e.path===t.path));a<0||(e.cacheRoutes.splice(a,1),e.cacheNames=e.cacheRoutes.map((e=>e.name)))},removeAll(e){const t=e.cacheRoutes.filter((e=>e.meta.affix));e.cacheRoutes=t,e.cacheNames=e.cacheRoutes.map((e=>e.name))},removeOther(e,t){e.cacheRoutes=e.cacheRoutes.filter((e=>e.meta.affix||e.path===t.path)),e.cacheNames=e.cacheRoutes.map((e=>e.name))},removeName(e,t){const a=e.cacheNames.findIndex((e=>e===t.name));a<0||e.cacheNames.splice(a,1)},clear(e){e.cacheRoutes=[],e.cacheNames=[]}},actions:{}});o.default.use(s.ZP);var l=new s.ZP.Store({state:{user:{id:"",name:"",img:"",token:""}},getters:{cacheRoutes(e){return e.tabBars.cacheRoutes}},mutations:{setUser(e,t){e.user.name=t.name,e.user.token=t.token}},actions:{},modules:{tabBars:r}}),c=function(e){Object.assign(this,e),Object.defineProperty(this,"keys",{value:Object.keys(e)});let t=[],a=[],o=[],n=[];const i=Object.values(e);"string"==typeof i[0]?(a=i,i.forEach(((e,t)=>{n.push({key:this.keys[t],text:a[t]})}))):i.forEach(((e,i)=>{a.push(e.text),t.push(e.value),o.push(e.type),n.push({key:this.keys[i],text:e.text,value:e.value,type:e.type})})),Object.defineProperty(this,"texts",{value:a}),Object.defineProperty(this,"values",{value:t}),Object.defineProperty(this,"entries",{value:n}),Object.defineProperty(this,"tableFormater",{value:function(e,t,a){return n.filter((e=>e.key===a||e.value===a))[0]?.text||"notfound"}}),Object.freeze(this)},u={sysName:"图书管理系统",footer:"BookAdmin Copyright @ by Kwong",bookStatus:new c({normal:{text:"正常",type:"success"},disable:{text:"下架",type:"warning"}}),orderStatus:new c({unpay:{text:"未支付",type:"warning"},canceled:{text:"已取消",type:"danger"},done:{text:"已完成",type:"success"}})},m=a(2631),d=a(8211),h={data(){return{visible:!1,config:d.x8,themas:d.Ni}},created(){this.$watch("config",(()=>{localStorage.setItem("admin_userconfig",JSON.stringify(this.config)),this.$i18n.locale=this.config.language}),{deep:!0})},methods:{show(){this.visible=!0},handleThemaClick(e){if("LI"!==e.target.tagName)return;const t=e.target.innerText;d.x8.thema=d.Ni.filter((e=>e.name==t))[0]}}},p=(0,n.Z)(h,(function(){var e=this,t=e._self._c;return t("el-drawer",{attrs:{title:e.$t("userConfig.title"),visible:e.visible,size:"300px",modal:!1},on:{"update:visible":function(t){e.visible=t}}},[t("b",[e._v(e._s(e.$t("userConfig.thema")))]),t("ul",{staticClass:"teama-box",on:{click:function(t){return e.handleThemaClick(t)}}},e._l(e.themas,(function(a){return t("li",{key:a.name,class:a.name==e.config.thema.name?"active":"",style:a},[e._v(e._s(a.name))])})),0),t("b",[e._v(e._s(e.$t("userConfig.routeAnimation")))]),t("el-switch",{staticClass:"config-box",attrs:{"active-text":e.$t("userConfig.enable")},model:{value:e.config.routerAnimation,callback:function(t){e.$set(e.config,"routerAnimation",t)},expression:"config.routerAnimation"}}),t("b",[e._v(e._s(e.$t("userConfig.language")))]),t("el-radio-group",{staticClass:"config-box",model:{value:e.config.language,callback:function(t){e.$set(e.config,"language",t)},expression:"config.language"}},[t("el-radio",{attrs:{label:"zh"}},[e._v("中文")]),t("el-radio",{attrs:{label:"en"}},[e._v("English")])],1)],1)}),[],!1,null,"37bf81e9",null).exports,f={name:"MenuItem",props:["item"],computed:{children(){return this.item?.children?.filter((e=>!e.hidden))},hasChildren(){return this.item?.children?.length>0}},methods:{title(e){return e.meta?.lang?this.$t("menu."+e.meta.lang):e.meta?.title}}},g={components:{MenuItem:(0,n.Z)(f,(function(){var e=this,t=e._self._c;return e.hasChildren?t("el-submenu",{staticClass:"msub-item",attrs:{index:e.item.path}},[t("template",{slot:"title"},[t("i",{class:e.item.meta.icon}),t("span",{attrs:{slot:"title"},slot:"title"},[e._v(e._s(e.title(e.item)))])]),e._l(e.children,(function(e){return t("MenuItem",{key:e.path,attrs:{item:e}})}))],2):t("el-menu-item",{staticClass:"mitem",attrs:{index:e.item.path}},[t("i",{class:e.item.meta.icon}),t("span",{attrs:{slot:"title"},slot:"title"},[e._v(e._s(e.title(e.item)))])])}),[],!1,null,"33cc6341",null).exports},data(){return{menuItems:[],config:d.x8}},computed:{},created:function(){this.menuItems=this.$router.options.routes.filter((e=>!e.hidden))}},b=(0,n.Z)(g,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"sidebar"},[t("div",{staticClass:"logo",style:e.config.thema},[t("span",[e._v("📖")]),t("h1",{class:e.config.menuCollapse?"collapse":""},[e._v(e._s(e.$t("sysName")))])]),t("el-menu",{staticClass:"view-scroll",attrs:{router:"",collapse:e.config.menuCollapse,"default-active":e.$route.path}},e._l(e.menuItems,(function(e){return t("MenuItem",{key:e.path,attrs:{item:e}})})),1)],1)}),[],!1,null,"19bade70",null).exports,v={data(){return{tagMenu:{visible:!1,top:0,left:0},selectedTag:{}}},computed:{cachedRoutes:function(){return this.$store.state.tabBars.cacheRoutes}},mounted(){this.initialAffix(),this.addTag()},watch:{$route(){this.addTag()},"tagMenu.visible":function(){this.tagMenu.visible?window.addEventListener("click",this.closeMenu):window.removeEventListener("click",this.closeMenu)}},methods:{isActive(e){return e.path===this.$route.path},isAffix(e){return e.meta&&e.meta.affix},initialAffix(){this.$router.options.routes.filter((e=>e.meta?.affix)).forEach((e=>{this.$store.commit("tabBars/add",e)}))},showMenu(e,t){this.selectedTag=e,this.tagMenu.visible=!0,this.tagMenu.top=t.clientY,this.tagMenu.left=t.clientX},refresh(e){this.$store.commit("tabBars/removeName",this.$route),this.$nextTick((()=>{this.$router.replace({path:"/redirect"+e.path})}))},closeMenu(){this.tagMenu.visible=!1},addTag(){"Redirect"!==this.$route.name&&this.$store.commit("tabBars/add",this.$route)},handleClose(e){e??=this.selectedTag;const t=this.cachedRoutes.indexOf(e);this.$store.commit("tabBars/remove",e),this.isActive(e)&&(this.cachedRoutes[t]?this.$router.push(this.cachedRoutes[t]):this.$router.push(this.cachedRoutes[t-1].path))},handleCloseOther(){this.$store.commit("tabBars/removeOther",this.selectedTag),this.isActive(this.selectedTag)||this.$router.push(this.selectedTag)},handleCloseAll(){this.$store.commit("tabBars/removeAll"),this.isActive(this.cachedRoutes[0])||this.$router.push(this.cachedRoutes[0]??"/")}}},y={data:function(){return{menuItems:[],config:d.x8}},computed:{cacheNames(){return this.$store.state.tabBars.cacheNames}},components:{UserConfig:p,TabsBar:(0,n.Z)(v,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"tabs-bar"},[e._l(e.cachedRoutes,(function(a){return t("router-link",{key:a.path,staticClass:"item",class:e.isActive(a)?"active":"",attrs:{to:a},nativeOn:{contextmenu:function(t){return t.preventDefault(),e.showMenu(a,t)}}},[t("i",{class:a.meta.icon}),e._v(" "+e._s(a.meta?.lang?e.$t("menu."+a.meta.lang):a.meta?.title)+" "),e.isAffix(a)?e._e():t("i",{staticClass:"el-icon-close close",on:{click:function(t){return t.preventDefault(),t.stopPropagation(),e.handleClose(a)}}})])})),t("el-card",{directives:[{name:"show",rawName:"v-show",value:e.tagMenu.visible,expression:"tagMenu.visible"}],staticClass:"menu",style:{left:e.tagMenu.left+"px",top:e.tagMenu.top+"px"}},[t("ul",[t("li",{directives:[{name:"show",rawName:"v-show",value:e.isActive(e.selectedTag),expression:"isActive(selectedTag)"}],on:{click:function(t){return e.refresh(e.selectedTag)}}},[t("i",{staticClass:"el-icon-refresh"}),e._v(" 刷新 ")]),t("li",{directives:[{name:"show",rawName:"v-show",value:!e.isAffix(e.selectedTag),expression:"!isAffix(selectedTag)"}],on:{click:function(t){return e.handleClose()}}},[t("i",{staticClass:"el-icon-close"}),e._v(" 关闭 ")]),t("li",{on:{click:function(t){return e.handleCloseOther()}}},[t("i",{staticClass:"el-icon-circle-close"}),e._v(" 关闭其他 ")]),t("li",{on:{click:e.handleCloseAll}},[t("i",{staticClass:"el-icon-error"}),e._v(" 关闭所有 ")])])])],2)}),[],!1,null,"b8f3953e",null).exports,MenuSidebar:b},methods:{handleCommand(e){switch(e){case"logout":this.$confirm.warning("确定要退出登录吗？").then((()=>{sessionStorage.removeItem("token"),this.$store.commit("tabBars/removeAll"),this.$router.push("/login")})).catch((()=>{}));break;case"pwd":this.$alert.warning("还未实现！");break;case"about":this.$router.push("/doc");break;case"user":this.$router.push("/user")}}},created:function(){this.menuItems=this.$router.options.routes.filter((e=>!e.hidden))}},k=(0,n.Z)(y,(function(){var e=this,t=e._self._c;return t("el-container",{staticStyle:{height:"100%"}},[t("el-container",{staticClass:"main-aside"},[t("el-aside",{attrs:{width:e.config.menuCollapse?"auto":"200px"}},[t("MenuSidebar")],1),t("el-container",[t("el-header",{staticClass:"header",style:e.config.thema},[t("div",{staticStyle:{flex:"1",overflow:"hidden"}},[t("TabsBar",{ref:"tabsBar"})],1),t("i",{staticClass:"el-icon-message-solid h-button",staticStyle:{padding:"0 4px"},attrs:{title:"系统通知，啥也不是！"}},[t("sup",{staticClass:"el-badge__content hbadge"},[e._v("12")])]),t("i",{staticClass:"el-icon-setting h-button",attrs:{title:"系统设置"},on:{click:function(t){return e.$refs.userConfig.show()}}}),t("el-dropdown",{staticClass:"header-userbox",on:{command:e.handleCommand}},[t("span",[t("img",{attrs:{src:e.$api.URL.proxy+"/file/f1.jpg",alt:"头像"}}),e._v(" [ "+e._s(e.$store.state.user.name)+" ] "),t("i",{staticClass:"el-icon-arrow-down el-icon--right",staticStyle:{"font-size":"12px"}})]),t("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[t("el-dropdown-item",{attrs:{command:"pwd"}},[e._v("修改密码")]),t("el-dropdown-item",{attrs:{command:"about"}},[t("i",{staticClass:"el-icon-info"}),e._v("关于 ")]),t("el-dropdown-item",{attrs:{command:"user"}},[t("i",{staticClass:"el-icon-user-solid"}),e._v("个人中心 ")]),t("el-divider"),t("el-dropdown-item",{attrs:{command:"logout",icon:"el-icon-circle-close"}},[e._v("退出登录")])],1)],1)],1),t("el-main",{staticClass:"main-wrapper"},[t("div",{staticClass:"breadcrumb-bar"},[t("el-button",{attrs:{type:"text",icon:e.config.menuCollapse?"el-icon-s-unfold":"el-icon-s-fold"},on:{click:function(t){e.config.menuCollapse=!e.config.menuCollapse}}}),t("el-breadcrumb",{staticStyle:{display:"inlne-block"},attrs:{separator:"/"}},e._l(e.$route.matched,(function(a){return t("el-breadcrumb-item",{key:a.name},[e._v(e._s(a.meta?.lang?e.$t("menu."+a.meta.lang):a.meta?.title))])})),1)],1),t("div",{staticClass:"main view-scroll"},[t("transition",{attrs:{name:e.config.routerAnimation?"fade-transform":"",mode:"out-in"}},[t("keep-alive",{attrs:{include:e.cacheNames}},[t("router-view")],1)],1)],1)])],1)],1),t("el-footer",{attrs:{height:"30px"}},[e._v(e._s(e.$consts.footer))]),t("UserConfig",{ref:"userConfig"})],1)}),[],!1,null,"7c925358",null).exports,_={data:function(){return{user:{name:"",pwd:""},rules:{name:[{required:!0,message:"用户名不能为空"},{min:3,max:8,message:"长度应为3-8"}],pwd:[{required:!0,message:"密码不能为空"},{min:3,max:8,message:"长度应为3-8"}]},loading:!1,remember:!1}},methods:{login(){this.loading=!0,this.$refs.userForm.validate(((e,t)=>{if(!e)return this.$message.error("输入有误，请修改后重新提交！"),void setTimeout((()=>this.loading=!1),500);this.$api.login(this.user).then((e=>{this.$message.success(e.message),this.$store.commit("setUser",{name:this.user.name,token:e.token}),sessionStorage.setItem("admin_token",e.token),localStorage.removeItem("admin_login_name"),this.remember&&localStorage.setItem("admin_login_name",this.user.name),this.$router.push("/home")})).catch((e=>{this.$message.error(e)})).finally((()=>{this.loading=!1}))}))}},created:function(){let e=localStorage.getItem("admin_login_name");e&&(this.remember=!0,this.user.name=e)}},w=[{path:"/login",name:"Login",meta:{title:"登录"},hidden:!0,component:(0,n.Z)(_,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"login-page"},[t("el-card",{staticClass:"login-box",attrs:{shadow:"always"}},[t("h2",[e._v("登 录")]),t("p",{staticClass:"t2"},[e._v("欢迎进入图书后台管理系统")]),t("el-form",{ref:"userForm",attrs:{model:e.user,"label-width":"80px",rules:e.rules}},[t("el-form-item",{attrs:{label:"用户名：",prop:"name",required:""}},[t("el-input",{attrs:{"prefix-icon":"el-icon-user",placeholder:"输入用户名",maxlength:"30",clearable:""},model:{value:e.user.name,callback:function(t){e.$set(e.user,"name",t)},expression:"user.name"}})],1),t("el-form-item",{attrs:{label:"密码：",prop:"pwd"}},[t("el-input",{attrs:{maxlength:"16","prefix-icon":"el-icon-lock","show-password":""},model:{value:e.user.pwd,callback:function(t){e.$set(e.user,"pwd",t)},expression:"user.pwd"}})],1),t("el-form-item",[t("el-checkbox",{attrs:{label:"记住用户名"},model:{value:e.remember,callback:function(t){e.remember=t},expression:"remember"}})],1),t("div",{staticClass:"btn"},[t("el-button",{attrs:{type:"primary",icon:"el-icon-circle-check",loading:e.loading},on:{click:e.login}},[e._v("登录")]),t("el-button",{attrs:{type:"warning",icon:"el-icon-refresh-left"},on:{click:function(t){return e.$refs.userForm.resetFields()}}},[e._v("重置")])],1)],1)],1),t("div",{staticClass:"footer"},[e._v(e._s(e.$consts.footer))])],1)}),[],!1,null,"11bd2305",null).exports},{path:"/",hidden:!0,component:k,redirect:"/home",meta:{title:"主页",lang:"main"},children:[{path:"/home",name:"Home",meta:{title:"主页"},component:()=>a.e(435).then(a.bind(a,5435))},{path:"/doc",name:"Doc",meta:{title:"文档"},component:()=>a.e(264).then(a.bind(a,9264))},{path:"/user",name:"User",component:()=>a.e(742).then(a.bind(a,8742)),meta:{title:"用户中心",icon:"el-icon-user-solid"}},{path:"/404",name:"Page404",meta:{title:"404"},hidden:!0,component:()=>a.e(286).then(a.bind(a,1286))},{path:"/401",name:"Page401",meta:{title:"401"},hidden:!0,component:()=>a.e(336).then(a.bind(a,1336))},{path:"/redirect/:path(.*)",name:"Redirect",hidden:!0,component:()=>a.e(423).then(a.bind(a,7423))}]},{path:"/home",name:"Home",meta:{title:"首页",lang:"home",icon:"el-icon-s-home",affix:!0}},{path:"/doc",name:"Doc",meta:{title:"文档",lang:"doc",icon:"el-icon-thumb",affix:!0}},{path:"/book",component:k,meta:{title:"书籍商城",lang:"bookshop",icon:"el-icon-notebook-2"},name:"书籍管理",children:[{path:"/books",name:"Books",meta:{title:"图书管理",lang:"book",icon:"el-icon-notebook-2"},component:()=>Promise.all([a.e(242),a.e(852)]).then(a.bind(a,3852))},{path:"/book/add",hidden:!0,meta:{title:"新增书籍",icon:"el-icon-add"},component:()=>a.e(516).then(a.bind(a,8516))},{path:"/book/update/:id",hidden:!0,meta:{title:"编辑书籍",icon:"el-icon-edit"},component:()=>a.e(516).then(a.bind(a,8516))},{path:"/order",name:"Orders",meta:{title:"图书订单",lang:"order",icon:"el-icon-s-shop"},component:()=>a.e(290).then(a.bind(a,5290))}]},{path:"/sys",component:k,meta:{title:"系统管理",lang:"sysManagement",icon:"el-icon-s-tools"},children:[{path:"/dic",name:"Dictionary",meta:{title:"字典管理",icon:"el-icon-s-order"},component:()=>a.e(572).then(a.bind(a,7775))},{path:"/template",name:"TempList",meta:{title:"模板页",icon:"el-icon-video-camera"},component:()=>Promise.all([a.e(242),a.e(38)]).then(a.bind(a,4038))}]},{path:"*",redirect:"/404",meta:{title:"404"}}];o.default.use(m.ZP);const x=new m.ZP({mode:"hash",base:"/kwebnote/",routes:w});x.beforeEach(((e,t,a)=>"/login"===e.path?a():sessionStorage.getItem("admin_token")?void a():a("/login"))),x.afterEach(((e,t)=>{document.title=u.sysName+"-"+e.meta.title}));var C=x,$=a(6018);o.default.use($.Z);var T=new $.Z({locale:"zh",messages:{en:{sysName:"Books Admin",menu:{main:"Main",home:"Home",doc:"Document",bookshop:"Books Mail",book:"Books",order:"Orders",sysManagement:"System"},userConfig:{title:"User Settings",thema:"Themas（Header）",routeAnimation:"Route switching animation",enable:"Enable",language:"language"},home:{user:" Registered users",book:"Number of books",order:"Quantity of order",money:"Total sales"}},zh:{sysName:"图书管理系统",menu:{main:"主页",home:"首页",doc:"文档",bookshop:"书籍商城",book:"图书管理",order:"图书订单",sysManagement:"系统管理"},userConfig:{title:"用户设置",thema:"主题（Header）",routeAnimation:"路由切换动画",enable:"启用",language:"语言"},home:{user:"注册用户数",book:"图书数量",order:"订单数量",money:"销售总额"}}}}),O=a(8499),A=a.n(O);o.default.use(A()),o.default.prototype.$ELEMENT={size:"medium"},["success","warning","info","error"].forEach((e=>{o.default.prototype.$alert[e]=function(t,a,n){return o.default.prototype.$alert(t,a,{type:e,...n})},o.default.prototype.$confirm[e]=function(t,a,n){return o.default.prototype.$confirm(t,a,{type:e,...n})},o.default.prototype.$notify[e]=function(t,a,n){return o.default.prototype.$notify({message:t,title:a,type:e,...n})}})),a(2403);var N=a(8638);o.default.prototype.$api=N.Z,o.default.prototype.$consts=u,o.default.config.productionTip=!1,new o.default({router:C,store:l,render:e=>e(i),i18n:T,created:function(){!function(){window.addEventListener("beforeunload",(()=>{sessionStorage.setItem("bookadmin_vstore",JSON.stringify(l.state))}));try{const e=sessionStorage.getItem("bookadmin_vstore");e&&l.replaceState(Object.assign({},l.state,JSON.parse(e)))}catch(e){console.log(e)}}(),function(){let e=localStorage.getItem("admin_userconfig");e&&(Object.assign(d.x8,JSON.parse(e)),d.x8.thema=d.Ni.filter((e=>e.name==d.x8.thema.name))[0],T.locale=d.x8.language)}()}}).$mount("#app")},8211:function(e,t,a){function o(){this.id="",this.name="",this.author="",this.introduction="",this.imgs="",this.price=0,this.status="normal",this.tag=""}a.d(t,{Ni:function(){return i},Ux:function(){return n},fy:function(){return o},x8:function(){return s}});const n={name:[{required:!0,message:"必填",trigger:"blur"}],author:[{required:!0,message:"必填",trigger:"blur"}],price:[{type:"number",min:0,max:99999,message:"价格应该为0到99999的数值",trigger:"change"}]},i=[{name:"靛青",backgroundColor:"#177CB0",color:"#FFF"},{name:"橘黄",backgroundColor:"#FF8936",color:"#FFF"},{name:"酱紫",backgroundColor:"#d0378d",color:"#FFF"},{name:"珍珠",backgroundColor:"#EEE",color:"#333"},{name:"玄青",backgroundColor:"#3D3B4F",color:"#EEE"},{name:"葱青",backgroundColor:"rgb(13 165 122)",color:"#EEE"}];let s={routerAnimation:!0,menuCollapse:!1,language:"zh",thema:i[0]}},2403:function(e,t,a){function o(e,t=100){let a=0;return(...o)=>{let n=Date.now();n-t>a&&(e.apply(this,o),a=n)}}a.d(t,{P2:function(){return o}}),Function.prototype.delay=function(e){let t=this;return function(...a){setTimeout(((...e)=>{t.apply(this,e)}),e)}},Function.prototype.throttle=function(e=100){let t,a=this,o=null;return function(...n){let i=Date.now();t&&i<t+e?(clearTimeout(o),o=setTimeout((()=>{a.apply(this,n),t=i}),Math.max(e-(i-t),0))):(t=i,a.apply(this,n))}},Array.prototype.remove=function(e){const t=this,a=t.filter(e);for(let e of a){const a=t.indexOf(e);a>=0&&t.splice(a,1)}},Array.prototype.last=function(){return this[this.length-1]}}},n={};function i(e){var t=n[e];if(void 0!==t)return t.exports;var a=n[e]={id:e,loaded:!1,exports:{}};return o[e].call(a.exports,a,a.exports,i),a.loaded=!0,a.exports}i.m=o,e=[],i.O=function(t,a,o,n){if(!a){var s=1/0;for(u=0;u<e.length;u++){a=e[u][0],o=e[u][1],n=e[u][2];for(var r=!0,l=0;l<a.length;l++)(!1&n||s>=n)&&Object.keys(i.O).every((function(e){return i.O[e](a[l])}))?a.splice(l--,1):(r=!1,n<s&&(s=n));if(r){e.splice(u--,1);var c=o();void 0!==c&&(t=c)}}return t}n=n||0;for(var u=e.length;u>0&&e[u-1][2]>n;u--)e[u]=e[u-1];e[u]=[a,o,n]},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,{a:t}),t},i.d=function(e,t){for(var a in t)i.o(t,a)&&!i.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},i.f={},i.e=function(e){return Promise.all(Object.keys(i.f).reduce((function(t,a){return i.f[a](e,t),t}),[]))},i.u=function(e){return"js/"+e+"."+{38:"ae6f6bb1",242:"7f13ec9a",264:"030863ac",286:"d58594df",290:"2bcaabdd",336:"13ef742b",423:"f9917ca6",435:"27949427",516:"5e08c530",572:"33d7ffa7",742:"ac13cf5e",852:"e2aee25b"}[e]+".js"},i.miniCssF=function(e){return"css/"+e+"."+{38:"ece0be9e",264:"b2757b5c",286:"79d9d8c7",290:"871b468c",435:"18f82b91",516:"32535d7d",572:"56bdd8a8",742:"ca9aa838",852:"84fae518"}[e]+".css"},i.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t={},a="bookadmin:",i.l=function(e,o,n,s){if(t[e])t[e].push(o);else{var r,l;if(void 0!==n)for(var c=document.getElementsByTagName("script"),u=0;u<c.length;u++){var m=c[u];if(m.getAttribute("src")==e||m.getAttribute("data-webpack")==a+n){r=m;break}}r||(l=!0,(r=document.createElement("script")).charset="utf-8",r.timeout=120,i.nc&&r.setAttribute("nonce",i.nc),r.setAttribute("data-webpack",a+n),r.src=e),t[e]=[o];var d=function(a,o){r.onerror=r.onload=null,clearTimeout(h);var n=t[e];if(delete t[e],r.parentNode&&r.parentNode.removeChild(r),n&&n.forEach((function(e){return e(o)})),a)return a(o)},h=setTimeout(d.bind(null,void 0,{type:"timeout",target:r}),12e4);r.onerror=d.bind(null,r.onerror),r.onload=d.bind(null,r.onload),l&&document.head.appendChild(r)}},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e},i.p="/kwebnote/",function(){if("undefined"!=typeof document){var e={143:0};i.f.miniCss=function(t,a){e[t]?a.push(e[t]):0!==e[t]&&{38:1,264:1,286:1,290:1,435:1,516:1,572:1,742:1,852:1}[t]&&a.push(e[t]=function(e){return new Promise((function(t,a){var o=i.miniCssF(e),n=i.p+o;if(function(e,t){for(var a=document.getElementsByTagName("link"),o=0;o<a.length;o++){var n=(s=a[o]).getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(n===e||n===t))return s}var i=document.getElementsByTagName("style");for(o=0;o<i.length;o++){var s;if((n=(s=i[o]).getAttribute("data-href"))===e||n===t)return s}}(o,n))return t();!function(e,t,a,o,n){var i=document.createElement("link");i.rel="stylesheet",i.type="text/css",i.onerror=i.onload=function(a){if(i.onerror=i.onload=null,"load"===a.type)o();else{var s=a&&("load"===a.type?"missing":a.type),r=a&&a.target&&a.target.href||t,l=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");l.code="CSS_CHUNK_LOAD_FAILED",l.type=s,l.request=r,i.parentNode.removeChild(i),n(l)}},i.href=t,document.head.appendChild(i)}(e,n,0,t,a)}))}(t).then((function(){e[t]=0}),(function(a){throw delete e[t],a})))}}}(),function(){var e={143:0};i.f.j=function(t,a){var o=i.o(e,t)?e[t]:void 0;if(0!==o)if(o)a.push(o[2]);else{var n=new Promise((function(a,n){o=e[t]=[a,n]}));a.push(o[2]=n);var s=i.p+i.u(t),r=new Error;i.l(s,(function(a){if(i.o(e,t)&&(0!==(o=e[t])&&(e[t]=void 0),o)){var n=a&&("load"===a.type?"missing":a.type),s=a&&a.target&&a.target.src;r.message="Loading chunk "+t+" failed.\n("+n+": "+s+")",r.name="ChunkLoadError",r.type=n,r.request=s,o[1](r)}}),"chunk-"+t,t)}},i.O.j=function(t){return 0===e[t]};var t=function(t,a){var o,n,s=a[0],r=a[1],l=a[2],c=0;if(s.some((function(t){return 0!==e[t]}))){for(o in r)i.o(r,o)&&(i.m[o]=r[o]);if(l)var u=l(i)}for(t&&t(a);c<s.length;c++)n=s[c],i.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return i.O(u)},a=self.webpackChunkbookadmin=self.webpackChunkbookadmin||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))}();var s=i.O(void 0,[474,184,485,730],(function(){return i(5844)}));s=i.O(s)}();
//# sourceMappingURL=app.710204e8.js.map