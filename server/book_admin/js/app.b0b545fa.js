!function(){"use strict";var e,t,n,a={8898:function(e,t,n){var a=n(6943);const o={proxy:"",upload:"/upload",login:"/api/login",stats_base:"/api/stats_base",stats_order:"/api/stats_order",stats_user:"/api/stats_user",book_list:"/api/book/list",book_id:"/api/book/id",book_save:"/api/book/save",dictype:"/api/sys/dictype/list",dicdata:"/api/sys/dicdata/list",dicdata_save:"/api/sys/dicdata/save",dicdata_delete:"/api/sys/dicdata/delete",order_list:"/api/order/list",order_save:"/api/order/save"};let i=a.Z.create({baseURL:"",timeout:9e3});i.URL=o,i.interceptors.request.use((function(e){return e})),i.interceptors.response.use((e=>200===e.status&&"OK"===e.data?.status?Promise.resolve(e.data):Promise.reject(e.data?.message?e.data.message:e.status)),(e=>(console.error(e),Promise.reject(e.message)))),i.api=function(e){return Promise.resolve({data:[],total:10})},i.login=function(e){return i.post(o.login,e)},i.stats_base=function(){return i.get(o.stats_base)},i.stats_order=function(){return i.get(o.stats_order)},i.stats_user=function(){return i.get(o.stats_user)},i.book_list=function(e){return i.post(o.book_list,e)},i.book_id=function(e){return i.get(o.book_id,{params:e})},i.book_save=function(e){return i.post(o.book_save,e)},i.dictype=function(){return i.get(o.dictype)},i.dicdata=function(e){return i.get(o.dicdata,{params:e})},i.dicdata_save=function(e){return i.post(o.dicdata_save,e)},i.dicdata_delete=function(e){return i.post(o.dicdata_delete,e)},i.order_list=function(e){return i.post(o.order_list,e)},t.Z=i},905:function(e,t,n){var a=n(6369),o=n(1001),i=(0,o.Z)({},(function(){return(0,this._self._c)("router-view")}),[],!1,null,null,null).exports,s=n(3822),r=(n(7658),{namespaced:!0,state:{cacheRoutes:[],cacheNames:[]},mutations:{add(e,t){e.cacheRoutes.some((e=>e.path===t.path))||e.cacheRoutes.push({path:t.path,name:t.name,meta:t.meta}),e.cacheNames=e.cacheRoutes.map((e=>e.name))},remove(e,t){const n=e.cacheRoutes.findIndex((e=>e.path===t.path));n<0||(e.cacheRoutes.splice(n,1),e.cacheNames=e.cacheRoutes.map((e=>e.name)))},removeAll(e){const t=e.cacheRoutes.filter((e=>e.meta.affix));e.cacheRoutes=t,e.cacheNames=e.cacheRoutes.map((e=>e.name))},removeOther(e,t){e.cacheRoutes=e.cacheRoutes.filter((e=>e.meta.affix||e.path===t.path)),e.cacheNames=e.cacheRoutes.map((e=>e.name))},removeName(e,t){const n=e.cacheNames.findIndex((e=>e===t.name));n<0||e.cacheNames.splice(n,1)},clear(e){e.cacheRoutes=[],e.cacheNames=[]}},actions:{}});a.default.use(s.ZP);var l=new s.ZP.Store({state:{user:{id:"",name:"",img:"",token:""}},getters:{cacheRoutes(e){return e.tabBars.cacheRoutes}},mutations:{setUser(e,t){e.user.name=t.name,e.user.token=t.token}},actions:{},modules:{tabBars:r}}),c=function(e){Object.assign(this,e),Object.defineProperty(this,"keys",{value:Object.keys(e)});let t=[],n=[],a=[],o=[];const i=Object.values(e);"string"==typeof i[0]?(n=i,i.forEach(((e,t)=>{o.push({key:this.keys[t],text:n[t]})}))):i.forEach(((e,i)=>{n.push(e.text),t.push(e.value),a.push(e.type),o.push({key:this.keys[i],text:e.text,value:e.value,type:e.type})})),Object.defineProperty(this,"texts",{value:n}),Object.defineProperty(this,"values",{value:t}),Object.defineProperty(this,"entries",{value:o}),Object.defineProperty(this,"tableFormater",{value:function(e,t,n){return o.filter((e=>e.key===n||e.value===n))[0]?.text||"notfound"}}),Object.freeze(this)},u={sysName:"图书管理系统",footer:"BookAdmin Copyright @ by Kwong",bookStatus:new c({normal:{text:"正常",type:"success"},disable:{text:"下架",type:"warning"}}),orderStatus:new c({unpay:{text:"未支付",type:"warning"},canceled:{text:"已取消",type:"danger"},done:{text:"已完成",type:"success"}})},d=n(2631),m=n(8211),h={data(){return{visible:!1,config:m.x8,themas:m.Ni}},created(){this.$watch("config",(()=>{localStorage.setItem("admin_userconfig",JSON.stringify(this.config)),this.$i18n.locale=this.config.language}),{deep:!0})},methods:{show(){this.visible=!0},handleThemaClick(e){if("LI"!==e.target.tagName)return;const t=e.target.innerText;m.x8.thema=m.Ni.filter((e=>e.name==t))[0]}}},f=(0,o.Z)(h,(function(){var e=this,t=e._self._c;return t("el-drawer",{attrs:{title:e.$t("userConfig.title"),visible:e.visible,size:"300px",modal:!1},on:{"update:visible":function(t){e.visible=t}}},[t("b",[e._v(e._s(e.$t("userConfig.thema")))]),t("ul",{staticClass:"teama-box",on:{click:function(t){return e.handleThemaClick(t)}}},e._l(e.themas,(function(n){return t("li",{key:n.name,class:n.name==e.config.thema.name?"active":"",style:n},[e._v(e._s(n.name))])})),0),t("b",[e._v(e._s(e.$t("userConfig.routeAnimation")))]),t("el-switch",{staticClass:"config-box",attrs:{"active-text":e.$t("userConfig.enable")},model:{value:e.config.routerAnimation,callback:function(t){e.$set(e.config,"routerAnimation",t)},expression:"config.routerAnimation"}}),t("b",[e._v(e._s(e.$t("userConfig.language")))]),t("el-radio-group",{staticClass:"config-box",model:{value:e.config.language,callback:function(t){e.$set(e.config,"language",t)},expression:"config.language"}},[t("el-radio",{attrs:{label:"zh"}},[e._v("中文")]),t("el-radio",{attrs:{label:"en"}},[e._v("English")])],1)],1)}),[],!1,null,"7fd4f606",null).exports,p={name:"MenuItem",props:["item"],computed:{children(){return this.item?.children?.filter((e=>!e.hidden))},hasChildren(){return this.item?.children?.length>0}},methods:{title(e){return e.meta?.lang?this.$t("menu."+e.meta.lang):e.meta?.title}}},g={components:{MenuItem:(0,o.Z)(p,(function(){var e=this,t=e._self._c;return e.hasChildren?t("el-submenu",{staticClass:"msub-item",attrs:{index:e.item.path}},[t("template",{slot:"title"},[t("i",{class:e.item.meta.icon}),t("span",{attrs:{slot:"title"},slot:"title"},[e._v(e._s(e.title(e.item)))])]),e._l(e.children,(function(e){return t("MenuItem",{key:e.path,attrs:{item:e}})}))],2):t("el-menu-item",{staticClass:"mitem",attrs:{index:e.item.path}},[t("i",{class:e.item.meta.icon}),t("span",{attrs:{slot:"title"},slot:"title"},[e._v(e._s(e.title(e.item)))])])}),[],!1,null,"33cc6341",null).exports},data(){return{menuItems:[],config:m.x8}},computed:{},created:function(){this.menuItems=this.$router.options.routes.filter((e=>!e.hidden))}},b=(0,o.Z)(g,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"sidebar"},[t("div",{staticClass:"logo",style:e.config.thema},[t("span",[e._v("📖")]),t("h1",{class:e.config.menuCollapse?"collapse":""},[e._v(e._s(e.$t("sysName")))])]),t("el-menu",{staticClass:"view-scroll",attrs:{router:"",collapse:e.config.menuCollapse,"default-active":e.$route.path}},e._l(e.menuItems,(function(e){return t("MenuItem",{key:e.path,attrs:{item:e}})})),1)],1)}),[],!1,null,"19bade70",null).exports,v={data(){return{tagMenu:{visible:!1,top:0,left:0},selectedTag:{}}},computed:{cachedRoutes:function(){return this.$store.state.tabBars.cacheRoutes}},mounted(){this.initialAffix(),this.addTag()},watch:{$route(){this.addTag()},"tagMenu.visible":function(){this.tagMenu.visible?window.addEventListener("click",this.closeMenu):window.removeEventListener("click",this.closeMenu)}},methods:{isActive(e){return e.path===this.$route.path},isAffix(e){return e.meta&&e.meta.affix},initialAffix(){this.$router.options.routes.filter((e=>e.meta?.affix)).forEach((e=>{this.$store.commit("tabBars/add",e)}))},showMenu(e,t){this.selectedTag=e,this.tagMenu.visible=!0,this.tagMenu.top=t.clientY,this.tagMenu.left=t.clientX},refresh(e){this.$store.commit("tabBars/removeName",this.$route),this.$nextTick((()=>{this.$router.replace({path:"/redirect"+e.path})}))},closeMenu(){this.tagMenu.visible=!1},addTag(){"Redirect"!==this.$route.name&&this.$store.commit("tabBars/add",this.$route)},handleClose(e){e??=this.selectedTag;const t=this.cachedRoutes.indexOf(e);this.$store.commit("tabBars/remove",e),this.isActive(e)&&(this.cachedRoutes[t]?this.$router.push(this.cachedRoutes[t]):this.$router.push(this.cachedRoutes[t-1].path))},handleCloseOther(){this.$store.commit("tabBars/removeOther",this.selectedTag),this.isActive(this.selectedTag)||this.$router.push(this.selectedTag)},handleCloseAll(){this.$store.commit("tabBars/removeAll"),this.isActive(this.cachedRoutes[0])||this.$router.push(this.cachedRoutes[0]??"/")}}},y={data:function(){return{menuItems:[],config:m.x8}},computed:{cacheNames(){return this.$store.state.tabBars.cacheNames}},components:{UserConfig:f,TabsBar:(0,o.Z)(v,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"tabs-bar"},[e._l(e.cachedRoutes,(function(n){return t("router-link",{key:n.path,staticClass:"item",class:e.isActive(n)?"active":"",attrs:{to:n},nativeOn:{contextmenu:function(t){return t.preventDefault(),e.showMenu(n,t)}}},[t("i",{class:n.meta.icon}),e._v(" "+e._s(n.meta?.lang?e.$t("menu."+n.meta.lang):n.meta?.title)+" "),e.isAffix(n)?e._e():t("i",{staticClass:"el-icon-close close",on:{click:function(t){return t.preventDefault(),t.stopPropagation(),e.handleClose(n)}}})])})),t("el-card",{directives:[{name:"show",rawName:"v-show",value:e.tagMenu.visible,expression:"tagMenu.visible"}],staticClass:"menu",style:{left:e.tagMenu.left+"px",top:e.tagMenu.top+"px"}},[t("ul",[t("li",{directives:[{name:"show",rawName:"v-show",value:e.isActive(e.selectedTag),expression:"isActive(selectedTag)"}],on:{click:function(t){return e.refresh(e.selectedTag)}}},[t("i",{staticClass:"el-icon-refresh"}),e._v(" 刷新 ")]),t("li",{directives:[{name:"show",rawName:"v-show",value:!e.isAffix(e.selectedTag),expression:"!isAffix(selectedTag)"}],on:{click:function(t){return e.handleClose()}}},[t("i",{staticClass:"el-icon-close"}),e._v(" 关闭 ")]),t("li",{on:{click:function(t){return e.handleCloseOther()}}},[t("i",{staticClass:"el-icon-circle-close"}),e._v(" 关闭其他 ")]),t("li",{on:{click:e.handleCloseAll}},[t("i",{staticClass:"el-icon-error"}),e._v(" 关闭所有 ")])])])],2)}),[],!1,null,"ee4f7418",null).exports,MenuSidebar:b},methods:{handleCommand(e){switch(e){case"logout":this.$confirm.warning("确定要退出登录吗？").then((()=>{sessionStorage.removeItem("token"),this.$router.push("/login")})).catch((()=>{}));break;case"pwd":this.$alert.warning("还未实现！");break;case"about":this.$alert('<b>关于作者：</b> <span style="display: flex;align-items: center;"> <img src="./public/img/am.png" alt height="60px" /> <a href="https://www.yuque.com/kanding" target="_blank">&nbsp;语雀「 安木夕」</a>&nbsp;&nbsp;|&nbsp;&nbsp; <a href="https://github.com/kwonganding" target="_blank">&nbsp;Github「 Kanding」</a> </span>',{dangerouslyUseHTMLString:!0});break;case"user":this.$router.push("/user")}}},created:function(){this.menuItems=this.$router.options.routes.filter((e=>!e.hidden))}},k=(0,o.Z)(y,(function(){var e=this,t=e._self._c;return t("el-container",{staticStyle:{height:"100%"}},[t("el-container",{staticClass:"main-aside"},[t("el-aside",{attrs:{width:e.config.menuCollapse?"auto":"200px"}},[t("MenuSidebar")],1),t("el-container",[t("el-header",{staticClass:"header",style:e.config.thema},[t("div",{staticStyle:{flex:"1",overflow:"hidden"}},[t("TabsBar",{ref:"tabsBar"})],1),t("i",{staticClass:"el-icon-message-solid h-button",staticStyle:{padding:"0 4px"},attrs:{title:"系统通知，啥也不是！"}},[t("sup",{staticClass:"el-badge__content hbadge"},[e._v("12")])]),t("i",{staticClass:"el-icon-setting h-button",attrs:{title:"系统设置"},on:{click:function(t){return e.$refs.userConfig.show()}}}),t("el-dropdown",{staticClass:"header-userbox",on:{command:e.handleCommand}},[t("span",[t("img",{attrs:{src:e.$api.URL.proxy+"/file/f1.jpg",alt:"头像"}}),e._v(" [ "+e._s(e.$store.state.user.name)+" ] "),t("i",{staticClass:"el-icon-arrow-down el-icon--right",staticStyle:{"font-size":"12px"}})]),t("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[t("el-dropdown-item",{attrs:{command:"pwd"}},[e._v("修改密码")]),t("el-dropdown-item",{attrs:{command:"about"}},[t("i",{staticClass:"el-icon-info"}),e._v("关于")]),t("el-dropdown-item",{attrs:{command:"user"}},[t("i",{staticClass:"el-icon-user-solid"}),e._v("个人中心 ")]),t("el-divider"),t("el-dropdown-item",{attrs:{command:"logout",icon:"el-icon-circle-close"}},[e._v("退出登录")])],1)],1)],1),t("el-main",{staticClass:"main-wrapper"},[t("div",{staticClass:"breadcrumb-bar"},[t("el-button",{attrs:{type:"text",icon:e.config.menuCollapse?"el-icon-s-unfold":"el-icon-s-fold"},on:{click:function(t){e.config.menuCollapse=!e.config.menuCollapse}}}),t("el-breadcrumb",{staticStyle:{display:"inlne-block"},attrs:{separator:"/"}},e._l(e.$route.matched,(function(n){return t("el-breadcrumb-item",{key:n.name},[e._v(e._s(n.meta?.lang?e.$t("menu."+n.meta.lang):n.meta?.title))])})),1)],1),t("div",{staticClass:"main view-scroll"},[t("transition",{attrs:{name:e.config.routerAnimation?"fade-transform":"",mode:"out-in"}},[t("keep-alive",{attrs:{include:e.cacheNames}},[t("router-view")],1)],1)],1)])],1)],1),t("el-footer",{attrs:{height:"30px"}},[e._v(e._s(e.$consts.footer))]),t("UserConfig",{ref:"userConfig"})],1)}),[],!1,null,"711cec91",null).exports,_={data:function(){return{user:{name:"",pwd:""},rules:{name:[{required:!0,message:"用户名不能为空"},{min:3,max:8,message:"长度应为3-8"}],pwd:[{required:!0,message:"密码不能为空"},{min:3,max:8,message:"长度应为3-8"}]},loading:!1,remember:!1}},methods:{login(){this.loading=!0,this.$refs.userForm.validate(((e,t)=>{if(!e)return this.$message.error("输入有误，请修改后重新提交！"),void setTimeout((()=>this.loading=!1),500);this.$api.login(this.user).then((e=>{this.$message.success(e.message),this.$store.commit("setUser",{name:this.user.name,token:e.token}),sessionStorage.setItem("admin_token",e.token),localStorage.removeItem("admin_login_name"),this.remember&&localStorage.setItem("admin_login_name",this.user.name),this.$router.push("/home")})).catch((e=>{this.$message.error(e)})).finally((()=>{this.loading=!1}))}))}},created:function(){let e=localStorage.getItem("admin_login_name");e&&(this.remember=!0,this.user.name=e)}},x=[{path:"/login",name:"Login",meta:{title:"登录"},hidden:!0,component:(0,o.Z)(_,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"login-page"},[t("el-card",{staticClass:"login-box",attrs:{shadow:"hover"}},[t("h2",[e._v("登 录")]),t("p",{staticClass:"t2"},[e._v("欢迎进入图书后台管理系统")]),t("el-form",{ref:"userForm",attrs:{model:e.user,"label-width":"80px",rules:e.rules}},[t("el-form-item",{attrs:{label:"用户名：",prop:"name",required:""}},[t("el-input",{attrs:{"prefix-icon":"el-icon-user",placeholder:"输入用户名",maxlength:"30",clearable:""},model:{value:e.user.name,callback:function(t){e.$set(e.user,"name",t)},expression:"user.name"}})],1),t("el-form-item",{attrs:{label:"密码：",prop:"pwd"}},[t("el-input",{attrs:{maxlength:"16","prefix-icon":"el-icon-lock","show-password":""},model:{value:e.user.pwd,callback:function(t){e.$set(e.user,"pwd",t)},expression:"user.pwd"}})],1),t("el-form-item",[t("el-checkbox",{attrs:{label:"记住用户名"},model:{value:e.remember,callback:function(t){e.remember=t},expression:"remember"}})],1),t("div",{staticClass:"btn"},[t("el-button",{attrs:{type:"primary",icon:"el-icon-circle-check",loading:e.loading},on:{click:e.login}},[e._v("登录")]),t("el-button",{attrs:{type:"warning",icon:"el-icon-refresh-left"},on:{click:function(t){return e.$refs.userForm.resetFields()}}},[e._v("重置")])],1)],1)],1),t("div",{staticClass:"footer"},[e._v(e._s(e.$consts.footer))])],1)}),[],!1,null,"56687f4e",null).exports},{path:"/",hidden:!0,component:k,redirect:"/home",meta:{title:"主页",lang:"main"},children:[{path:"/home",name:"Home",component:()=>n.e(435).then(n.bind(n,5435))},{path:"/doc",name:"Doc",component:()=>n.e(265).then(n.bind(n,3265))},{path:"/user",name:"User",component:()=>n.e(742).then(n.bind(n,8742)),meta:{title:"用户中心",icon:"el-icon-user-solid"}},{path:"/404",name:"Page404",meta:{title:"404"},hidden:!0,component:()=>n.e(286).then(n.bind(n,1286))},{path:"/401",name:"Page401",meta:{title:"401"},hidden:!0,component:()=>n.e(570).then(n.bind(n,2570))},{path:"/redirect/:path(.*)",name:"Redirect",hidden:!0,component:()=>n.e(423).then(n.bind(n,7423))}]},{path:"/home",name:"Home",meta:{title:"首页",lang:"home",icon:"el-icon-s-home",affix:!0}},{path:"/doc",name:"Doc",meta:{title:"文档",lang:"doc",icon:"el-icon-thumb",affix:!0}},{path:"/book",component:k,meta:{title:"书籍商城",lang:"bookshop",icon:"el-icon-notebook-2"},name:"书籍管理",children:[{path:"/books",name:"Books",meta:{title:"图书管理",lang:"book",icon:"el-icon-notebook-2"},component:()=>Promise.all([n.e(242),n.e(864)]).then(n.bind(n,3864))},{path:"/book/add",hidden:!0,meta:{title:"新增书籍",icon:"el-icon-add"},component:()=>n.e(516).then(n.bind(n,8516))},{path:"/book/update/:id",hidden:!0,meta:{title:"编辑书籍",icon:"el-icon-edit"},component:()=>n.e(516).then(n.bind(n,8516))},{path:"/order",name:"Orders",meta:{title:"图书订单",lang:"order",icon:"el-icon-s-shop"},component:()=>n.e(558).then(n.bind(n,3558))}]},{path:"/sys",component:k,meta:{title:"系统管理",lang:"sysManagement",icon:"el-icon-s-tools"},children:[{path:"/dic",name:"Dictionary",meta:{title:"字典管理",icon:"el-icon-s-order"},component:()=>n.e(0).then(n.bind(n,5e3))},{path:"/template",name:"TempList",meta:{title:"模板页",icon:"el-icon-video-camera"},component:()=>Promise.all([n.e(242),n.e(38)]).then(n.bind(n,4038))}]},{path:"*",redirect:"/404",meta:{title:"404"}}];a.default.use(d.ZP);const w=new d.ZP({mode:"history",base:"/bookadmin/",routes:x});w.beforeEach(((e,t,n)=>"/login"===e.path?n():sessionStorage.getItem("admin_token")?void n():n("/login"))),w.afterEach(((e,t)=>{document.title=u.sysName+"-"+e.meta.title}));var C=w,$=n(6018);a.default.use($.Z);var O=new $.Z({locale:"en",messages:{en:{sysName:"Books Admin",menu:{main:"Main",home:"Home",doc:"Document",bookshop:"Books Mail",book:"Books",order:"Orders",sysManagement:"System"},userConfig:{title:"User Settings",thema:"Themas（Header）",routeAnimation:"Route switching animation",enable:"Enable",language:"language"},home:{user:" Registered users",book:"Number of books",order:"Quantity of order",money:"Total sales"}},zh:{sysName:"图书管理系统",menu:{main:"主页",home:"首页",doc:"文档",bookshop:"书籍商城",book:"图书管理",order:"图书订单",sysManagement:"系统管理"},userConfig:{title:"用户设置",thema:"主题（Header）",routeAnimation:"路由切换动画",enable:"启用",language:"语言"},home:{user:"注册用户数",book:"图书数量",order:"订单数量",money:"销售总额"}}}}),N=n(8499),T=n.n(N);a.default.use(T()),a.default.prototype.$ELEMENT={size:"medium"},["success","warning","info","error"].forEach((e=>{a.default.prototype.$alert[e]=function(t,n,o){return a.default.prototype.$alert(t,n,{type:e,...o})},a.default.prototype.$confirm[e]=function(t,n,o){return a.default.prototype.$confirm(t,n,{type:e,...o})},a.default.prototype.$notify[e]=function(t,n,o){return a.default.prototype.$notify({message:t,title:n,type:e,...o})}})),n(2403);var A=n(8898);a.default.prototype.$api=A.Z,a.default.prototype.$consts=u,a.default.config.productionTip=!1,new a.default({router:C,store:l,render:e=>e(i),i18n:O,created:function(){!function(){window.addEventListener("beforeunload",(()=>{sessionStorage.setItem("bookadmin_vstore",JSON.stringify(l.state))}));try{const e=sessionStorage.getItem("bookadmin_vstore");e&&l.replaceState(Object.assign({},l.state,JSON.parse(e)))}catch(e){console.log(e)}}(),function(){let e=localStorage.getItem("admin_userconfig");e&&(Object.assign(m.x8,JSON.parse(e)),m.x8.thema=m.Ni.filter((e=>e.name==m.x8.thema.name))[0],O.locale=m.x8.language)}()}}).$mount("#app")},8211:function(e,t,n){function a(){this.id="",this.name="",this.author="",this.introduction="",this.imgs="",this.price=0,this.status="normal",this.tag=""}n.d(t,{Ni:function(){return i},Ux:function(){return o},fy:function(){return a},x8:function(){return s}});const o={name:[{required:!0,message:"必填",trigger:"blur"}],author:[{required:!0,message:"必填",trigger:"blur"}],price:[{type:"number",min:0,max:99999,message:"价格应该为0到99999的数值",trigger:"change"}]},i=[{name:"靛青",backgroundColor:"#177CB0",color:"#FFF"},{name:"橘黄",backgroundColor:"#FF8936",color:"#FFF"},{name:"酱紫",backgroundColor:"#d0378d",color:"#FFF"},{name:"珍珠",backgroundColor:"#EEE",color:"#333"},{name:"玄青",backgroundColor:"#3D3B4F",color:"#EEE"},{name:"葱青",backgroundColor:"rgb(13 165 122)",color:"#EEE"}];let s={routerAnimation:!0,menuCollapse:!1,language:"zh",thema:i[0]}},2403:function(e,t,n){function a(e,t=100){let n=0;return(...a)=>{let o=Date.now();o-t>n&&(e.apply(this,a),n=o)}}n.d(t,{P2:function(){return a}}),Function.prototype.delay=function(e){let t=this;return function(...n){setTimeout(((...e)=>{t.apply(this,e)}),e)}},Function.prototype.throttle=function(e=100){let t,n=this,a=null;return function(...o){let i=Date.now();t&&i<t+e?(clearTimeout(a),a=setTimeout((()=>{n.apply(this,o),t=i}),Math.max(e-(i-t),0))):(t=i,n.apply(this,o))}},Array.prototype.remove=function(e){const t=this,n=t.filter(e);for(let e of n){const n=t.indexOf(e);n>=0&&t.splice(n,1)}},Array.prototype.last=function(){return this[this.length-1]}}},o={};function i(e){var t=o[e];if(void 0!==t)return t.exports;var n=o[e]={id:e,loaded:!1,exports:{}};return a[e].call(n.exports,n,n.exports,i),n.loaded=!0,n.exports}i.m=a,e=[],i.O=function(t,n,a,o){if(!n){var s=1/0;for(u=0;u<e.length;u++){n=e[u][0],a=e[u][1],o=e[u][2];for(var r=!0,l=0;l<n.length;l++)(!1&o||s>=o)&&Object.keys(i.O).every((function(e){return i.O[e](n[l])}))?n.splice(l--,1):(r=!1,o<s&&(s=o));if(r){e.splice(u--,1);var c=a();void 0!==c&&(t=c)}}return t}o=o||0;for(var u=e.length;u>0&&e[u-1][2]>o;u--)e[u]=e[u-1];e[u]=[n,a,o]},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,{a:t}),t},i.d=function(e,t){for(var n in t)i.o(t,n)&&!i.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},i.f={},i.e=function(e){return Promise.all(Object.keys(i.f).reduce((function(t,n){return i.f[n](e,t),t}),[]))},i.u=function(e){return"js/"+e+"."+{0:"132d5e1c",38:"ae6f6bb1",242:"7f13ec9a",265:"cbde4936",286:"d58594df",423:"f9917ca6",435:"27949427",516:"5e08c530",558:"c7456400",570:"a33b5614",742:"ac13cf5e",864:"28d4ca56"}[e]+".js"},i.miniCssF=function(e){return"css/"+e+"."+{0:"dbda057e",38:"ece0be9e",265:"72ad1d82",286:"79d9d8c7",435:"18f82b91",516:"32535d7d",558:"a2e7e361",742:"ca9aa838",864:"354f294a"}[e]+".css"},i.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t={},n="bookadmin:",i.l=function(e,a,o,s){if(t[e])t[e].push(a);else{var r,l;if(void 0!==o)for(var c=document.getElementsByTagName("script"),u=0;u<c.length;u++){var d=c[u];if(d.getAttribute("src")==e||d.getAttribute("data-webpack")==n+o){r=d;break}}r||(l=!0,(r=document.createElement("script")).charset="utf-8",r.timeout=120,i.nc&&r.setAttribute("nonce",i.nc),r.setAttribute("data-webpack",n+o),r.src=e),t[e]=[a];var m=function(n,a){r.onerror=r.onload=null,clearTimeout(h);var o=t[e];if(delete t[e],r.parentNode&&r.parentNode.removeChild(r),o&&o.forEach((function(e){return e(a)})),n)return n(a)},h=setTimeout(m.bind(null,void 0,{type:"timeout",target:r}),12e4);r.onerror=m.bind(null,r.onerror),r.onload=m.bind(null,r.onload),l&&document.head.appendChild(r)}},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e},i.p="/bookadmin/",function(){if("undefined"!=typeof document){var e={143:0};i.f.miniCss=function(t,n){e[t]?n.push(e[t]):0!==e[t]&&{0:1,38:1,265:1,286:1,435:1,516:1,558:1,742:1,864:1}[t]&&n.push(e[t]=function(e){return new Promise((function(t,n){var a=i.miniCssF(e),o=i.p+a;if(function(e,t){for(var n=document.getElementsByTagName("link"),a=0;a<n.length;a++){var o=(s=n[a]).getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(o===e||o===t))return s}var i=document.getElementsByTagName("style");for(a=0;a<i.length;a++){var s;if((o=(s=i[a]).getAttribute("data-href"))===e||o===t)return s}}(a,o))return t();!function(e,t,n,a,o){var i=document.createElement("link");i.rel="stylesheet",i.type="text/css",i.onerror=i.onload=function(n){if(i.onerror=i.onload=null,"load"===n.type)a();else{var s=n&&("load"===n.type?"missing":n.type),r=n&&n.target&&n.target.href||t,l=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");l.code="CSS_CHUNK_LOAD_FAILED",l.type=s,l.request=r,i.parentNode.removeChild(i),o(l)}},i.href=t,document.head.appendChild(i)}(e,o,0,t,n)}))}(t).then((function(){e[t]=0}),(function(n){throw delete e[t],n})))}}}(),function(){var e={143:0};i.f.j=function(t,n){var a=i.o(e,t)?e[t]:void 0;if(0!==a)if(a)n.push(a[2]);else{var o=new Promise((function(n,o){a=e[t]=[n,o]}));n.push(a[2]=o);var s=i.p+i.u(t),r=new Error;i.l(s,(function(n){if(i.o(e,t)&&(0!==(a=e[t])&&(e[t]=void 0),a)){var o=n&&("load"===n.type?"missing":n.type),s=n&&n.target&&n.target.src;r.message="Loading chunk "+t+" failed.\n("+o+": "+s+")",r.name="ChunkLoadError",r.type=o,r.request=s,a[1](r)}}),"chunk-"+t,t)}},i.O.j=function(t){return 0===e[t]};var t=function(t,n){var a,o,s=n[0],r=n[1],l=n[2],c=0;if(s.some((function(t){return 0!==e[t]}))){for(a in r)i.o(r,a)&&(i.m[a]=r[a]);if(l)var u=l(i)}for(t&&t(n);c<s.length;c++)o=s[c],i.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return i.O(u)},n=self.webpackChunkbookadmin=self.webpackChunkbookadmin||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var s=i.O(void 0,[474,184,485,730],(function(){return i(905)}));s=i.O(s)}();
//# sourceMappingURL=app.b0b545fa.js.map