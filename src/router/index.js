import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/**
 * 检测账号是否登录的函数
 * @returns {boolean} 返回是否已经登录账号
 */
const checkAccountIsLogin = () => {
    const localToken = localStorage.getItem('token');
    const sessionStore = JSON.parse(sessionStorage.getItem('store'));
    if (sessionStore && localToken === sessionStore.userInfo.token){
        return true;
    }
    localStorage.removeItem('token');
    alert('暂未登录，请勿强行进行跳转操作');
    return false;
}

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "Home" */ '../views/Home/index'),
        meta: {
            title: '主页'
        },
        children: [
            {
                path: 'account-management',
                name: 'AccountManagement',
                component: () => import(/* webpackChunkName: "AccountManagement" */ '../views/Home/HRManagement/AccountManagement/index'),
                mata: {
                    title: '账户管理'
                }
            },
            {
                path: 'role-management',
                name: 'RoleManagement',
                component: () => import(/* webpackChunkName: "RoleManagement" */ '../views/Home/HRManagement/RoleManagement/index'),
                mata: {
                    title: '角色管理'
                }
            },
            {
                path: 'permission-management',
                name: 'PermissionManagement',
                component: () => import(/* webpackChunkName: "PermissionManagement" */ '../views/Home/HRManagement/RoleManagement/index'),
                mata: {
                    title: '角色管理'
                }
            },
            {
                path: 'carousel-management',
                name: 'CarouselManagement',
                component: () => import(/* webpackChunkName: "CarouselManagement" */ '../views/Home/CarouselManagement/CarouselManagement'),
                mata: {
                    title: '轮播图管理'
                }
            },
            {
                path: 'carousel-preview',
                name: 'CarouselPreview',
                component: () => import(/* webpackChunkName: "CarouselPreview" */ '../views/Home/CarouselManagement/CarouselPreview/index'),
                meta: {
                    title: '轮播图预览'
                }
            },
            {
                path: 'goods-series-management',
                name: 'GoodsSeriesManagement',
                component: () => import(/* webpackChunkName: "GoodsSeriesManagement" */ '../views/Home/GoodsManagement/GoodsSeriesManagement/index'),
                meta: {
                    title: '轮播图预览'
                }
            },
            {
                path: 'window-goods-management',
                name: 'WindowGoodsManagement',
                component: () => import(/* webpackChunkName: "WindowGoodsManagement" */ '../views/Home/GoodsManagement/WindowGoodsManagement/index'),
                meta: {
                    title: '轮播图预览'
                }
            },
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
router.beforeEach((to, from, next) => {
    /*
      实现除login页面之外的所有页面跳转时进行账号检测的功能
      若未登录将会强行拦截路由跳转请求并且重定向至 login 页面
      若已登录将进行放行
   */
    if (to.fullPath === '/login' || from.fullPath === '/login') {
        next();
        return;
    }
    const isLogin = checkAccountIsLogin();
    isLogin ? next() : next('/login');
})

export default router
