<template>
    <el-menu
        :default-active="$route.path"
        exact
        class="home-slide-menu"
        background-color="#20303f"
        text-color="#ffffff"
        active-text-color="#FFD585"
        unique-opened
        router
    >
        <h2 class="logo">门窗世界后台管理系统</h2>
        <aside-nav-item
            v-for="item in menuList"
            :key="item.url"
            :item='item'
        ></aside-nav-item>
    </el-menu>
</template>

<script>
import AsideNavItem from "./AsideNavItem";

export default {
    name: "AsideNav",
    components: {
        AsideNavItem
    },
    data() {
        return {
            // 菜单存储数据
            menuList: [
                {
                    title: '人事管理',
                    url: "/hr",
                    iconClassName: 'el-icon-user',
                    child: [
                        {
                            title: '账户管理',
                            url: '/hr/account'
                        },
                        {
                            title: '角色管理',
                            url: '/hr/role'
                        },
                        {
                            title: '权限管理',
                            url: '/hr/permission'
                        },
                    ]
                },
                {
                    title: '轮播图管理',
                    url: '/carousel',
                    iconClassName: 'el-icon-picture-outline',
                    child: [
                        {
                            title: '预览轮播图',
                            url: '/carousel/preview'
                        },
                        {
                            title: '管理轮播图',
                            url: '/carousel/management'
                        },
                    ]
                },
                {
                    title: '商品管理',
                    url: '/goods',
                    iconClassName: 'el-icon-present',
                    child: [
                        {
                            title: '窗系列',
                            url: '/goods/window',
                            child: [
                                {
                                    title: '系列管理',
                                    url: '/goods/window/series'
                                },
                                {
                                    title: '商品管理',
                                    url: '/goods/window/commodity'
                                }
                            ]
                        },
                        {
                            title: '门系列',
                            url: '/goods/door',
                            child: [
                                {
                                    title: '系列管理',
                                    url: '/goods/door/series'
                                },
                                {
                                    title: '商品管理',
                                    url: '/goods/door/commodity'
                                }
                            ]
                        },
                        {
                            title: '房系列',
                            url: '/goods/house',
                            child: [
                                {
                                    title: '系列管理',
                                    url: '/goods/house/series'
                                },
                                {
                                    title: '商品管理',
                                    url: '/goods/house/commodity'
                                }
                            ]
                        },
                    ]
                },
                {
                    title: '订单管理',
                    url: '/order',
                    iconClassName: 'el-icon-document',
                },
                {
                    title: '在线客服',
                    url: '/cs',
                    iconClassName: 'el-icon-chat-dot-square',
                }
            ]
        }
    }
}
</script>

<style scoped>
.logo {
    color: white;
    font-weight: 700;
    font-size: 20px;
    height: 60px;
    line-height: 60px;
    text-align: center;
}

.home-slide-menu {
    height: 100%;
}
</style>