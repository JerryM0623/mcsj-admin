import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/**
 * 检测账号是否登录的函数
 * @returns {boolean} 返回是否已经登录账号
 */
const checkAccountIsLogin = () => {
    const token = localStorage.getItem('token');
    if (!token){
        alert('暂未登录,请勿强行进行页面跳转');
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
        children: [
            {
                path: '/hr/account',
                name: 'account',
                component: () => import(/* webpackChunkName: "account" */ '../views/Home/HR/Account'),
                mata: {
                    title: '账户管理'
                }
            },
            {
                path: '/hr/role',
                name: 'role',
                component: () => import(/* webpackChunkName: "role" */ '../views/Home/HR/Role'),
                mata: {
                    title: '角色管理'
                }
            },
            {
                path: '/hr/permission',
                name: 'permission',
                component: () => import(/* webpackChunkName: "permission" */ '../views/Home/HR/Permission'),
                mata: {
                    title: '权限管理'
                }
            },
            {
                path: '/carousel/management',
                name: 'carouselManagement',
                component: () => import(/* webpackChunkName: "carouselManagement" */ '../views/Home/Carousel/Management'),
                mata: {
                    title: '管理轮播图'
                }
            },
            {
                path: '/carousel/preview',
                name: 'carouselPreview',
                component: () => import(/* webpackChunkName: "carouselPreview" */ '../views/Home/Carousel/Preview'),
                meta: {
                    title: '预览轮播图'
                }
            },
            {
                path: '/goods/window/series',
                name: 'windowSeries',
                component: () => import(/* webpackChunkName: "windowSeries" */ '../views/Home/Goods/Window/Series/index'),
                meta: {
                    title: '窗系列管理'
                }
            },
            {
                path: '/goods/window/commodity',
                name: 'windowSeries',
                component: () => import(/* webpackChunkName: "windowCommodity" */ '../views/Home/Goods/Window/Commodity/index'),
                meta: {
                    title: '窗商品管理'
                }
            },
            {
                path: '/goods/door/series',
                name: 'doorSeries',
                component: () => import(/* webpackChunkName: "doorSeries" */ '../views/Home/Goods/Door/Series/index'),
                meta: {
                    title: '门系列管理'
                }
            },
            {
                path: '/goods/door/commodity',
                name: 'doorCommodity',
                component: () => import(/* webpackChunkName: "doorCommodity" */ '../views/Home/Goods/Door/Commodity/index'),
                meta: {
                    title: '门商品管理'
                }
            },
            {
                path: '/goods/house/series',
                name: 'houseSeries',
                component: () => import(/* webpackChunkName: "houseSeries" */ '../views/Home/Goods/House/Series/index'),
                meta: {
                    title: '房系列管理'
                }
            },
            {
                path: '/goods/house/commodity',
                name: 'houseCommodity',
                component: () => import(/* webpackChunkName: "houseCommodity" */ '../views/Home/Goods/House/Commodity/index'),
                meta: {
                    title: '房商品管理'
                }
            },
            {
                path: '/order',
                name: 'order',
                component: () => import(/* webpackChunkName: "order" */ '../views/Home/Order/index'),
                meta: {
                    title: '订单管理'
                }
            },
            {
                path: '/cs',
                name: 'cs',
                component: () => import(/* webpackChunkName: "order" */ '../views/Home/CS/index'),
                meta: {
                    title: '在线客服'
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
