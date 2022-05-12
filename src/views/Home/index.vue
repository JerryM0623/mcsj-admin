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
                        <el-breadcrumb-item
                            v-for="item in breadCrumbDataList"
                            :key="item.meta.title"
                        >{{ item.meta.title }}
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                    <el-button @click="logout" class="log-out-btn" type="primary">退出登录</el-button>
                </el-header>
                <!--右侧子页面显示区域-->
                <el-main class="right-main">
                    <router-view></router-view>
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
    data() {
        return {
            // 面包屑展示所需数据
            breadCrumbDataList: []
        }
    },
    methods: {
        /**
         * 退出账户登录的方法
         */
        logout() {
            // 清除数据
            localStorage.removeItem('accountInfo');
            sessionStorage.removeItem('store');
            this.$store.dispatch('removeUserInfo');
            // 发送通知
            this.$message.success('退出登录');
            // 跳转页面
            this.$router.push('/login');
        },

        /**
         * 获取面包屑展示所需数据的方法
         */
        getBreadCrumbData() {
            this.breadCrumbDataList = this.$route.matched;
        }
    },
    watch: {
        // 监听全局路由,实现面包屑依赖数据的更新
        $route(to) {
            this.breadCrumbDataList = to.matched;
        }
    },
    mounted() {
        // 传入面包屑所需要的数据
        this.getBreadCrumbData();
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

.right-main {
    background-color: #f1f2f6;
}
</style>