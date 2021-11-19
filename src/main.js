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
// 高德离线地图
import VueAMap from 'vue-amap';
Vue.use(VueAMap);
 
VueAMap.initAMapApiLoader({
  // 高德key
  key: 'f7725eb0233cc0a6b17961b4d9c9bfe0', // 自己到官网申请，我随便写的
  // 插件集合 （插件按需引入）
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.MarkerClusterer'],
  v: '1.4.15', // 我也不知道为什么要写这个，不写项目会报错，而且我随便写的，跟我下载的版本对应不了
  uiVersion: '1.0.11' // ui版本号，也是需要写
})
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
