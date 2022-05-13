<template>
    <el-menu
        :default-active="$route.path"
        exact
        class="home-slide-menu"
        background-color="#20303f"
        text-color="#ffffff"
        active-text-color="#FFD585"
        unique-opened
    >
        <h2 class="logo">门窗视界后台管理系统</h2>
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
                            title: '职位管理',
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
                },
                {
                    title: '商品管理',
                    url: '/goods',
                    iconClassName: 'el-icon-present',
                    child: [
                        {
                            title: '系列管理',
                            url: '/goods/series',
                        },
                        {
                            title: '类别管理',
                            url: '/goods/types',
                        },
                        {
                            title: '产品管理',
                            url: '/goods/product',
                            child: [
                                {
                                    title: '窗类产品管理',
                                    url: '/goods/product/window'
                                },
                                {
                                    title: '门类产品管理',
                                    url: '/goods/product/door'
                                },
                                {
                                    title: '房类产品管理',
                                    url: '/goods/product/house'
                                },
                            ]
                        },
                    ]
                },
                {
                    title: '订单管理',
                    url: '/order',
                    iconClassName: 'el-icon-document',
                },
                // {
                //     title: '在线客服',
                //     url: '/cs',
                //     iconClassName: 'el-icon-chat-dot-square',
                // }
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