import Vue from 'vue'
import Router from 'vue-router'
 
//组件模块
import Login from '@/views/login'
// 首页
import homepage from '@/views/homepage'
// 编写
import write from '@/views/write'
// 个人信息
import userMsg from '@/views/userMsg'
 
Vue.use(Router)
 
export default new Router({
    mode:'history',
  routes: [
    { path: '/login', name: 'Login', component: Login },
    {path:'/',name:'homepage',component:homepage},
    {path:'/write',name:'write',component:write},
    {path:'/userMsg',name:'userMsg',component:userMsg}
  ]
})