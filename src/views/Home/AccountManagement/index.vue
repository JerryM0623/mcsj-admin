<template>
  <div class="account-management-container">
    <!--  搜索框-->
    <el-card class="account-search-bar">
      <h1 class="tip-title">搜索账户</h1>
      <el-select class="search-type-select" v-model="searchAccount.searchTypeShow" placeholder="查询类型">
        <el-option value="id">id</el-option>
        <el-option value="账号">账号</el-option>
        <el-option value="职位">职位</el-option>
      </el-select>
      <el-input v-model="searchAccount.searchInput" class="search-input" placeholder="请输入信息"></el-input>
      <el-button type="primary" @click="search">搜索</el-button>
      <el-button type="primary" @click="clearSearch">清除搜索结果</el-button>
    </el-card>
<!--    添加-->
      <el-card shadow="always" class="add-account">
          <h1 class="tip-title">添加账户</h1>
          <el-input v-model="addAccount.accountInput" class="account-input" placeholder="请输入账号"></el-input>
          <el-input type="password" v-model="addAccount.passwordInput" class="password-input" placeholder="请输入密码"></el-input>
          <el-input type="password" v-model="addAccount.checkPasswordInput" class="check-password-input" placeholder="请再次输入密码"></el-input>
          <el-select class="account-type-select" v-model="addAccount.roleType" placeholder="选择职业">
            <el-option value="超级管理员">超级管理员</el-option>
            <el-option value="商品管理员">商品管理员</el-option>
            <el-option value="客服专员">客服专员</el-option>
          </el-select>
          <el-button type="primary" @click="handleAddAccount">添加</el-button>
          <el-button type="danger">清空</el-button>
      </el-card>
    <!--  表格-->
    <el-table
        v-loading = "loading"
        :data="accountDataShow"
        border
        style="width: 100%;box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1)">
      <el-table-column
          prop="id"
          label="用户编号"
          width="80"
          align="center"
      >
      </el-table-column>
      <el-table-column
          prop="account"
          label="账号"
          align="center"
      >
      </el-table-column>
      <el-table-column
          prop="password"
          label="密码"
          align="center"
      >
      </el-table-column>
      <el-table-column
          prop="role"
          label="职位"
          align="center"
      >
      </el-table-column>
      <el-table-column
          label="操作"
          width="150"
      >
        <template v-slot:default="scope">
          <el-button @click="console.log(scope)" type="primary" size="small">编辑</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "AccountManagement",
  data() {
    return {
      // 添加账户的数据
      addAccount:{
        accountInput:'',
        passwordInput:'',
        checkPasswordInput:'',
        roleType:''
      },
      // 搜索模块的数据
      searchAccount:{
        searchInput:'',
        searchTypeShow:'',
        searchTypeData:''
      },
      // 后端返回的数据
      accountData: [],
      accountDataShow:[],
      // 控制 loading 遮罩
      loading: false,
    }
  },
  methods:{
    /**
     * 查询全部账户信息的函数
     */
    async getAllAccount(){
      try{
        // 开启 loading 遮罩
        this.loading = true;
        // 发送请求
        const res = await this.$axios.get('/admin/accounts');
        const newRes = res.data.sort((a, b) => {
          return a.id - b.id;
        })
        // 处理数据
        this.accountData = this.accountDataShow = newRes;
        // 关闭 loading 遮罩
        this.loading = false;
      }catch (err){
        console.log(err);
      }
    },

    /**
     * 根据传入的数据查询账户信息的函数
     */
    search(){
      // 判断
      if(!this.searchAccount.searchTypeData || !this.searchAccount.searchTypeShow) {
        this.$message({
          type:"warning",
          message:"请选择类型"
        })
        return;
      }
      if(!this.searchAccount.searchInput) {
        this.$message({
          type:"warning",
          message:"请输入关键字"
        })
        return;
      }
      this.loading = true;
      // 两个都输入了,根据传入的类型进行 filter
      const res = this.accountData.filter((item) => {
        return item.id.toString() === this.searchAccount.searchInput || item.account === this.searchAccount.searchInput || item.role === this.searchAccount.searchInput
      })
      this.accountDataShow = res.sort((a, b) => {
        return a.id - b.id;
      })
      this.loading = false;
    },

    /**
     * 清除搜索结果
     */
    clearSearch(){
      this.searchAccount.searchTypeData ='';
      this.searchAccount.searchTypeShow ='';
      this.searchAccount.searchInput ='';
      this.accountDataShow = this.accountData;
    },

    /**
     * 输入数据时进行验证工作
     */
    addAccountCheck(){
      if(!this.addAccount.accountInput) {
        this.$message({
          type:"warning",
          message:"请填写账号"
        })
        return false;
      }
      if(this.addAccount.accountInput.length > 10 || this.addAccount.accountInput.length < 6){
        this.$message({
          type:"warning",
          message:"账号的长度在6-10之间哦"
        })
        return false;
      }

      if(!this.addAccount.passwordInput) {
        this.$message({
          type:"warning",
          message:"请填写密码"
        })
        return false;
      }
      if(this.addAccount.passwordInput.length < 6 || this.addAccount.passwordInput.length > 10){
        this.$message({
          type:"warning",
          message:"密码的长度在6-10之间哦"
        })
        return false;
      }

      if(!this.addAccount.checkPasswordInput) {
        this.$message({
          type:"warning",
          message:"请再次填写密码"
        })
        return false;
      }
      if(this.addAccount.checkPasswordInput !== this.addAccount.passwordInput){
        this.$message({
          type:"warning",
          message:"两次密码填写不一致，请重新填写"
        })
        return false;
      }

      if(!this.addAccount.roleType){
        this.$message({
          type:"warning",
          message:"请选择职业类型"
        })
        return false;
      }
      return true;
    },

    /**
     * 添加用户的方法
     */
    async handleAddAccount() {
      if (this.addAccountCheck()){
        // 发起请求
        const res = await this.$axios.post('/admin/account/add',{
          account:this.addAccount.accountInput,
          password:this.addAccount.passwordInput,
          role:this.addAccount.roleType
        })
        this.$message({
          type: res.code === 200 ? "success" : "error",
          message:res.msg
        })
        // 清空输入
        if (res.code === 200){
          this.addAccount.accountInput = '';
          this.addAccount.passwordInput = '';
          this.addAccount.checkPasswordInput ='';
          this.addAccount.roleType = '';

          // 刷新表格
          this.getAllAccount();
        }
      }
    },
  },
  mounted(){
    // 向后端查询全部账户信息
    this.getAllAccount();
  },
  watch:{
    searchAccount:{
      deep:true,
      handler(newVal){
        if (newVal.searchTypeShow === 'id'){
          newVal.searchTypeData = 'id';
          return;
        }
        if (newVal.searchTypeShow === '账号'){
          newVal.searchTypeData = 'account';
          return;
        }
        if (newVal.searchTypeShow === '职位'){
          newVal.searchTypeData = 'role';
        }
      }
    }
  }
}
</script>

<style scoped>
.tip-title{
  font-size: 14px;
  color: #cecfd1;
  margin-bottom: 10px;
}
.search-type-select{
  width: 10%;
  margin-right: 10px;
}
.search-input {
  width: 25%;
  margin-right: 10px;
}
.account-search-bar,
.add-account{
  margin-bottom: 20px;
}
.account-input,
.password-input,
.check-password-input,
.account-type-select{
  width: 20%;
  margin-right: 15px;
}
</style>