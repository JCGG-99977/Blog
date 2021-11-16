import Vue from 'vue'
import Router from 'vue-router'
 
//组件模块
import Login from '@/views/login'
// 首页
import homepage from '@/views/homepage'

 
Vue.use(Router)
 
export default new Router({
    mode:'history',
  routes: [
    { path: '/', name: 'Login', component: Login },
    {path:'/homepage',name:'homepage',component:homepage}
  ]
})