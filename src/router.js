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

import index from '@/index'

import seeblog from '@/views/seeBlog'

// 引入个人信息模块
import userperson from '@/user/userperson'
// 反馈模块
import feedback from '@/user/feedback'
// 我的博客
import userblog from '@/user/userblog'
// 博客管理
import blogmanager from '@/Manager/blogmanager'
// 用户管理
import usermanager from '@/Manager/usermanager'
 
Vue.use(Router)
const originalPush = Router.prototype.push

Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
    mode:'history',
  routes: [
    { path: '/login', name: 'Login', component: Login },
    {
        path:'/',
        name:'',
        component:index,
        children:[
            {path:'/write',name:'write',component:write},
            {
                path:'/userMsg',
                name:'userMsg',
                component:userMsg,
                children:[
                    {path:'/userMsg',name:'userperson',component:userperson},
                    {path:'/userMsg/feedback',name:'feedback',component:feedback},
                    {path:'/userMsg/userblog',name:'userblog',component:userblog},
                    {path:'/userMsg/userMsg',name:'userperson',component:userperson},
                    {path:'/userMsg/blogmanager',name:'blogmanager',component:blogmanager},
                    {path:'/userMsg/usermanager',name:'usermanager',component:usermanager},
                ]
            },
            {path:'/',name:'homepage',component:homepage},
            {path:'/userMsg/seeblog',name:'seeblog',component:seeblog},
            {path:'/userMsg/write',name:'write',component:write},
            
            
        ]
},
   
  ]
})