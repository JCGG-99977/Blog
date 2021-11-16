import Vue from 'vue'
import Router from 'vue-router'
 
//组件模块
import Login from '@/views/login'

 
Vue.use(Router)
 
export default new Router({
    mode:'history',
  routes: [
    { path: '/', name: 'Login', component: Login },
  ]
})