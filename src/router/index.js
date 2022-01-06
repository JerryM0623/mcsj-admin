import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/**
 * 检测账号是否登录的函数
 * @returns {boolean} 返回是否已经登录账号
 */
const checkAccountIsLogin = () => {
    const token = localStorage.getItem('token');
    if(!token){
        alert('暂未登录，请勿强行进行页面跳转！！！');
        return false;
    }
    return true;
}

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "Home" */ '../views/Home/index'),
        meta: {
            title: '主页'
        },
        children:[
            {
                path:'account-management',
                name:'AccountManagement',
                component:() => import(/* webpackChunkName: "Home" */ '../views/Home/AccountManagement/index'),
                mata:{
                    title:'账户管理'
                }
            },
            {
                path:'role-management',
                name:'RoleManagement',
                component:() => import(/* webpackChunkName: "Home" */ '../views/Home/RoleManagement/index'),
                mata:{
                    title:'角色管理'
                }
            },
            {
                path:'Carousel-management',
                name:'CarouselManagement',
                component:() => import(/* webpackChunkName: "Home" */ '../views/Home/CarouselManagement/index'),
                mata:{
                    title:'轮播图管理'
                }
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "login" */ '../views/Login/index'),
        meta: {
            title: '登录'
        }
    }
]

const router = new VueRouter({
    routes
})

// 前置路由守卫
router.beforeEach((to,from,next) => {
    /*
      实现除login页面之外的所有页面跳转时进行账号检测的功能
      若未登录将会强行拦截路由跳转请求并且重定向至 login 页面
      若已登录将进行放行
   */
    if (to.fullPath === '/login') {
        next();
        return;
    }
    const isLogin = checkAccountIsLogin();
    isLogin ? next() : next('/login');
})

export default router
