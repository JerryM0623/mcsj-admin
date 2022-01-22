<template>
    <div class="home">
        <el-container class="home-container">
            <!--侧边栏-->
            <el-aside class="left-container" width="250px">
                <aside-nav></aside-nav>
            </el-aside>
            <!--右侧界面-->
            <el-container class="right-container">
                <!--右侧头部-->
                <el-header class="right-header">
                    <el-breadcrumb class="bread-crumb" separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item>首页</el-breadcrumb-item>
                        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
                        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
                    </el-breadcrumb>
                    <el-button @click="logout" class="log-out-btn" type="primary">退出登录</el-button>
                </el-header>
                <!--右侧子页面显示区域-->
                <el-main>
                    <router-view class="subpage-container"></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import AsideNav from "./components/AsideNav";

export default {
    name: "Home",
    components: {
        AsideNav,
    },
    methods: {
        /**
         * 退出账户登录的回调函数
         */
        logout() {
            // 清除数据
            localStorage.removeItem('token');
            sessionStorage.removeItem('store');
            this.$store.dispatch('removeUserInfo');
            // 发送通知
            this.$message.success('退出登录');
            // 跳转页面
            this.$router.push('/login');
        }
    },
    computed: {
        getUserName() {
            return this.$store.state.userInfo.account;
        }
    }
}
</script>

<style scoped>
.home {
    height: 100%;
    width: 100%;
}

.home-container {
    height: 100%;
}

.left-container {
    height: 100%;
}

.right-header {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
}
</style>