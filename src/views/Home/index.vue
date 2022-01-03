<template>
  <div class="home-container">
    <div class="left">
      <el-col class="home-slide-menu-container">
        <el-menu
            default-active="5"
            class="home-slide-menu"
            background-color="#20303f"
            text-color="#ffffff"
            active-text-color="#FFD585"
        >
          <h2 class="logo">门窗世界后台管理系统</h2>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span>人事管理</span>
            </template>
            <el-menu-item index="1-1"><span>账户管理</span></el-menu-item>
            <el-menu-item index="1-2"><span>角色管理</span></el-menu-item>
            <el-menu-item index="1-3"><span>权限管理</span></el-menu-item>
          </el-submenu>
          <el-menu-item index="2"><i class="el-icon-picture-outline"></i><span>轮播图管理</span></el-menu-item>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-present"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="3-1"><span>窗系列</span></el-menu-item>
            <el-menu-item index="3-2"><span>门系列</span></el-menu-item>
            <el-menu-item index="3-3"><span>房系列</span></el-menu-item>
          </el-submenu>
          <el-menu-item index="4"><i class="el-icon-document"></i><span>订单管理</span></el-menu-item>
          <el-menu-item index="5"><i class="el-icon-chat-dot-square"></i><span>在线客服</span></el-menu-item>
        </el-menu>

      </el-col>
    </div>
    <div class="right">
      <div class="home-top-bar">
        <el-menu mode="horizontal">
          <el-menu-item class="avatar"><el-avatar :src="getUserAvatar"></el-avatar></el-menu-item>
          <el-submenu index="profile">
            <template slot="title">
              <span>{{getUserName}}</span>
            </template>
            <el-menu-item index="showProfile"><span>个人信息</span></el-menu-item>
            <el-menu-item index="logout" @click="logout"><span>退出登录</span></el-menu-item>
          </el-submenu>
        </el-menu>
<!--        <div class="avatar"></div>-->
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  methods:{
    logout(){
      // 清除数据
      localStorage.removeItem('token')
      // 通知
      this.$message({
        message:'退出成功',
        type:"success"
      })
      // 返回login
      this.$router.push('/login');
    }
  },
  computed:{
    getUserAvatar(){
      return this.$store.state.userInfo.user_avatar;
    },
    getUserName(){
      return this.$store.state.userInfo.account;
    }
  }
}
</script>

<style scoped>
.home-container {
  height: 100%;
  width: 100%;
}

.left,
.right{
  float: left;
  height: 100%;
}
.left{
  width: 250px;
  margin: 0;
}
.right{
  width: calc(100% - 250px);
  background-color: #f2f5fc;
}

/* 左侧竖着的菜单栏 */
.logo {
  color: white;
  font-weight: 700;
  font-size: 20px;
  height: 60px;
  line-height: 60px;
  text-align: center;
}

.home-slide-menu-container,
.home-slide-menu {
  height: 100%;
}

/* top-header */
.home-top-bar{
  /*width: 200px;*/
  height: 60px;
  background-color: #ffffff;
  color: black;
  line-height: 60px;
  padding: 0 20px;
  box-shadow: 0 5px 10px rgba(0,0,0,0.1);
}
.home-top-bar div{
  float: left;
}
.avatar{
  margin-left: 80%;
}
.avatar:hover{
  cursor: pointer;
}
</style>