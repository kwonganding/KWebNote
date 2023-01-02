import Vue from 'vue'
import Element from 'element-ui'
//css
import 'element-ui/lib/theme-chalk/index.css'
//自定义的element样式
import './element.css'

//Vue注册全部
Vue.use(Element);
//设置默认大小为中杯，默认尺寸实在太大了
Vue.prototype.$ELEMENT = { size: 'medium' };

//扩展一下messagbox的type方法:success/warning/info/error
const types = ['success', 'warning', 'info', 'error'];
types.forEach(type => {
    Vue.prototype.$alert[type] = function (mes, title, options) {
        return Vue.prototype.$alert(mes, title, { type, ...options });
    }
    Vue.prototype.$confirm[type] = function (mes, title, options) {
        return Vue.prototype.$confirm(mes, title, { type, ...options });
    }
    //默认notify提供的type方法没有title参数，添加一个
    Vue.prototype.$notify[type] = function (mes, title, options) {
        return Vue.prototype.$notify({ message: mes, title, type, ...options });
    }
})

