import Vue from 'vue'
import VueI18n from 'vue-i18n'
// import elemtn_en from 'element-ui/lib/locale/lang/en'
// import elemtn_zhcn from 'element-ui/lib/locale/lang/zh-CN'
import lang_zhcn from './lang-cn'
import lang_en from './lang-en'

//注册
Vue.use(VueI18n);
//申明i18n
const i18n = new VueI18n({
  locale: 'zh',     //选中的语言
  messages: {
    en: {
      ...lang_en,   //英文语言配置
    },
    zh: {
      ...lang_zhcn, //中文语言配置
    }
  }
})

// Vue.use(Element, {
//   i18n: (key, value) => i18n.t(key, value)
// })

//导出i18n
export default i18n