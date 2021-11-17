import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import vuex from 'vuex'
import $ from 'jquery'
// 编辑器
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import {
  post,
  get,
  put,
  del
} from './http'
// 定义全局变量，用与axios数据的请求
Vue.prototype.$post = post
Vue.prototype.$get = get
Vue.prototype.$put = put
Vue.prototype.$delete = del
Vue.prototype.$=$
Vue.use(vuex)
Vue.use(ElementUI);
Vue.use(mavonEditor)
Vue.config.productionTip = false
// vuex
const store = new vuex.Store({
  // 存储用户的id
  state: {
    id: ''
  },
})
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
