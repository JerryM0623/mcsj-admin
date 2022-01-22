<template>
    <el-menu
        class="home-slide-menu"
        background-color="#20303f"
        text-color="#ffffff"
        active-text-color="#FFD585"
        unique-opened
    >
        <h2 class="logo">门窗世界后台管理系统</h2>
        <el-submenu index="humanResource-management">
            <template slot="title">
                <i class="el-icon-user"></i>
                <span>人事管理</span>
            </template>
            <router-link to="account-management">
                <el-menu-item index="account-management"><span>账户管理</span></el-menu-item>
            </router-link>
            <router-link to="role-management">
                <el-menu-item index="role-management"><span>角色管理</span></el-menu-item>
            </router-link>
            <router-link to="permission-management">
                <el-menu-item index="authority-management"><span>权限管理</span></el-menu-item>
            </router-link>
        </el-submenu>
        <el-submenu index="CarouselManagement">
            <template v-slot:title>
                <i class="el-icon-picture-outline"></i>
                <span>轮播图管理</span>
            </template>
            <router-link to="carousel-preview">
                <el-menu-item index="account-preview"><span>预览轮播图</span></el-menu-item>
            </router-link>
            <router-link to="carousel-management">
                <el-menu-item index="account-management"><span>管理轮播图</span></el-menu-item>
            </router-link>
        </el-submenu>
        <el-submenu index="goods-management">
            <template slot="title">
                <i class="el-icon-present"></i>
                <span>商品管理</span>
            </template>
            <el-menu-item-group>
                <template slot="title">系列管理</template>
                <router-link to="goods-series-management">
                    <el-menu-item index="goods-series-management"><span>系列管理</span></el-menu-item>
                </router-link>
            </el-menu-item-group>
            <el-menu-item-group>
                <template slot="title">商品管理</template>
                <router-link to="window-goods-management">
                    <el-menu-item index="window-goods-management"><span>窗系列商品管理</span></el-menu-item>
                </router-link>
                <router-link to="door-goods-management">
                    <el-menu-item index="door-goods-management"><span>门系列商品管理</span></el-menu-item>
                </router-link>
                <router-link to="house-goods-management">
                    <el-menu-item index="house-goods-management"><span>房系列商品管理</span></el-menu-item>
                </router-link>
            </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="4"><i class="el-icon-document"></i><span>订单管理</span></el-menu-item>
        <el-menu-item index="5"><i class="el-icon-chat-dot-square"></i><span>在线客服</span></el-menu-item>
    </el-menu>
</template>

<script>
export default {
name: "AsideNav"
}
</script>

<style scoped>
/* 左侧竖着的菜单栏 */
.logo {
    color: white;
    font-weight: 700;
    font-size: 20px;
    height: 60px;
    line-height: 60px;
    text-align: center;
}

/*.home-slide-menu-container,*/
.home-slide-menu {
    height: 100%;
}
</style>