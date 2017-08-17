import Vue from 'vue'
import ElementUI from 'element-ui'
import './assets/css/theme.scss'
import 'element-ui/lib/theme-default/index.css'
import 'babel-polyfill' //解决ie浏览器无内置promise对象
//引入字体图标
import './assets/font_kjmavcnbocz93sor/demo.css'
import './assets/font_kjmavcnbocz93sor/iconfont.css'
import $ from 'jquery' //引用jquery插件
import './assets/bootstrap/css/bootstrap.min.css'
/*Tree结构*/
// import './assets/js/zTreeStyle/jquery.ztree.all-3.5.min'
import './assets/js/zTreeStyle/zTreeStyle.min.css'
import './assets/js/common' //自定义的全局方法
import './assets/css/common.css' //引用全局的css样式
import 'normalize.css'
import App from './main.vue'
import router from './router/index' //引入路由
import store from './store/index'  //引入vuex
Vue.use(ElementUI);

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})
