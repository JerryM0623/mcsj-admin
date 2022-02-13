import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/**
 * 检测账号是否登录的函数
 * @returns {boolean} 返回是否已经登录账号
 */
// const checkAccountIsLogin = () => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//         alert('暂未登录,请勿强行进行页面跳转');
//         return false;
//     }
//     return true;
// }

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '../views/Home/index'),
        meta: {
            title: '主页'
        },
        children: [
            {
                path: 'hr',
                name: 'hr',
                meta: {
                    title: '人事管理'
                },
                component: () => import(/* webpackChunkName: "hr" */ '../views/Home/HR/index'),
                children: [
                    {
                        path: 'account',
                        name: 'account',
                        component: () => import(/* webpackChunkName: "account" */ '../views/Home/HR/Account/index'),
                        meta: {
                            title: '账户管理'
                        }
                    },
                    {
                        path: 'role',
                        name: 'role',
                        component: () => import(/* webpackChunkName: "role" */ '../views/Home/HR/Role/index'),
                        meta: {
                            title: '角色管理'
                        }
                    },
                    {
                        path: 'permission',
                        name: 'permission',
                        component: () => import(/* webpackChunkName: "permission" */ '../views/Home/HR/Permission/index'),
                        meta: {
                            title: '权限管理'
                        }
                    },
                ]
            },
            {
                path: 'carousel',
                name: 'carousel',
                meta: {
                    title: '轮播图管理'
                },
                component: () => import(/* webpackChunkName: "carousel" */ '../views/Home/Carousel/index')
            },
            {
                path: 'goods',
                name: 'goods',
                meta: {
                    title: '商品管理'
                },
                component: () => import(/* webpackChunkName: "goods" */ '../views/Home/Goods/index'),
                children: [
                    {
                        path: 'series',
                        name: 'series',
                        meta: {
                            title: '系列管理'
                        },
                        component: () => import(/* webpackChunkName: "series" */ '../views/Home/Goods/Series/index')
                    },
                    {
                        path: 'types',
                        name: 'types',
                        meta: {
                            title: '类别管理'
                        },
                        component: () => import(/* webpackChunkName: "types" */ '../views/Home/Goods/Types/index')
                    },
                    {
                        path: 'product',
                        name: 'product',
                        meta: {
                            title: '产品管理'
                        },
                        component: () => import(/* webpackChunkName: "product" */ '../views/Home/Goods/Product/index'),
                        children: [
                            {
                                path: 'window',
                                name: 'window',
                                meta: {
                                    title: '窗类产品管理'
                                },
                                component: () => import(/* webpackChunkName: "window" */ '../views/Home/Goods/Product/Window')
                            },
                            {
                                path: 'door',
                                name: 'door',
                                meta: {
                                    title: '门类产品管理'
                                },
                                component: () => import(/* webpackChunkName: "door" */ '../views/Home/Goods/Product/Door')
                            },
                            {
                                path: 'house',
                                name: 'house',
                                meta: {
                                    title: '房类产品管理'
                                },
                                component: () => import(/* webpackChunkName: "house" */ '../views/Home/Goods/Product/House')
                            }
                        ]
                    },
                ]
            },
            {
                path: 'order',
                name: 'order',
                component: () => import(/* webpackChunkName: "order" */ '../views/Home/Order/index'),
                meta: {
                    title: '订单管理'
                }
            },
            {
                path: 'cs',
                name: 'cs',
                component: () => import(/* webpackChunkName: "order" */ '../views/Home/CS/index'),
                meta: {
                    title: '在线客服'
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
// router.beforeEach((to, from, next) => {
//     /*
//       实现除login页面之外的所有页面跳转时进行账号检测的功能
//       若未登录将会强行拦截路由跳转请求并且重定向至 login 页面
//       若已登录将进行放行
//    */
//     if (to.fullPath === '/login' || from.fullPath === '/login') {
//         next();
//         return;
//     }
//     const isLogin = checkAccountIsLogin();
//     isLogin ? next() : next('/login');
// })

export default router
