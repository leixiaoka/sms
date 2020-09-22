import Vue from 'vue'
import Router from 'vue-router'
import Blank from '@/blank'
import Login from '@/components/login/index'
import UpdatePwd from '@/components/pwd/index'
import User from '@/components/user/index'
import EditUser from '@/components/user/edit'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login 
    }, {
      path:'/', 
      name:'Page', 
      component:Blank, 
      children:[{
        path: '/updatepwd',
        name: 'UpdatePwd',
        component: UpdatePwd
      },{
        path: '/user',
        name: 'User',
        component: User
      }, {
        path: '/user/edit',
        name: 'EditUser',
        component: EditUser
      }]
    }
  ]
})
