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
      <el-input type="password" v-model="addAccount.passwordInput" class="password-input"
                placeholder="请输入密码"></el-input>
      <el-input type="password" v-model="addAccount.checkPasswordInput" class="check-password-input"
                placeholder="请再次输入密码"></el-input>
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
        v-loading="loading"
        :data="accountDataShow"
        border
        height="335"
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
          <el-button @click="openEditDrawer(scope)" type="primary" size="small">编辑</el-button>
          <el-button type="danger" size="small" @click="deleteAccount(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>


    <el-drawer
        title="账号编辑"
        :before-close="isGiveUpEdit"
        :visible.sync="isDrawerShow"
        direction="ltr"
        custom-class="account-edit-drawer"
        ref="account-edit-drawer"
        :show-close="false"
    >
      <div class="account-edit-drawer__content">
        <el-form :model="editAccount" label-width="60">
          <el-form-item label="账号">
            <el-input class="drawer-input" v-model="editAccount.account" placeholder="请输入账号"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input class="drawer-input" type="password" show-password v-model="editAccount.password"
                      placeholder="请输入密码" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="职位">
            <el-select v-model="editAccount.roleType" placeholder="请选择职位">
              <el-option label="超级管理员" value="超级管理员"></el-option>
              <el-option label="商品管理员" value="商品管理员"></el-option>
              <el-option label="客服专员" value="客服专员"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="account-edit-drawer__footer">
          <el-button class="drawer-button" @click="isGiveUpEdit">取 消</el-button>
          <el-button class="drawer-button" type="primary" @click="editAccountFunc">提交</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import checkInput from '../../../utils/checkInput'

export default {
  name: "AccountManagement",
  data() {
    return {
      // 添加账户的数据
      addAccount: {
        accountInput: '',
        passwordInput: '',
        checkPasswordInput: '',
        roleType: ''
      },
      // 编辑账户
      editAccount: {
        id: '',
        account: '',
        password: '',
        roleType: ''
      },
      // 搜索模块的数据
      searchAccount: {
        searchInput: '',
        searchTypeShow: '',
        searchTypeData: ''
      },
      // 后端返回的数据
      accountData: [],
      accountDataShow: [],
      // 控制 loading 遮罩
      loading: false,
      // 控制 抽屉 开关
      isDrawerShow: false
    }
  },
  methods: {
    /**
     * 查询全部账户信息的函数
     */
    async getAllAccount() {
      try {
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
      } catch (err) {
        console.log(err);
      }
    },

    /**
     * 根据传入的数据查询账户信息的函数
     */
    search() {
      // 判断
      if (!this.searchAccount.searchTypeData || !this.searchAccount.searchTypeShow) {
        this.$message({
          type: "warning",
          message: "请选择类型"
        })
        return;
      }
      if (!this.searchAccount.searchInput) {
        this.$message({
          type: "warning",
          message: "请输入关键字"
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
    clearSearch() {
      this.searchAccount.searchTypeData = '';
      this.searchAccount.searchTypeShow = '';
      this.searchAccount.searchInput = '';
      this.accountDataShow = this.accountData;
    },

    /**
     * 添加用户的方法
     */
    async handleAddAccount() {
      const res1 = await checkInput.accountCheck(this.addAccount.accountInput, this);
      const res2 = await checkInput.passwordCheck(this.addAccount.passwordInput, this);
      const res3 = await checkInput.rePasswordCheck(this.addAccount.passwordInput, this.addAccount.checkPasswordInput, this);
      const res4 = await checkInput.roleCheck(this.addAccount.roleType, this);

      if (res1 && res2 && res3 && res4) {
        // 发起请求
        const res = await this.$axios.post('/admin/account/add', {
          account: this.addAccount.accountInput,
          password: this.addAccount.passwordInput,
          role: this.addAccount.roleType
        })
        this.$message({
          type: res.code === 200 ? "success" : "error",
          message: res.msg
        })
        // 清空输入
        if (res.code === 200) {
          this.addAccount.accountInput = '';
          this.addAccount.passwordInput = '';
          this.addAccount.checkPasswordInput = '';
          this.addAccount.roleType = '';

          // 刷新表格
          this.getAllAccount();
        }
      }
    },

    /**
     * 开启编辑账户抽屉的函数
     * @param scoped
     */
    openEditDrawer(scoped) {
      // 配置数据
      const {id, account, password, role} = scoped.row;
      this.editAccount = {
        id,
        account,
        password,
        roleType: role
      }
      // 展开抽屉
      this.isDrawerShow = true;
    },

    /**
     * 在抽屉关闭之前提醒用户
     */
    isGiveUpEdit() {
      // 开启弹框
      this.$confirm('您确定要退出吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.isDrawerShow = false;
      })
    },

    /**
     * 提交编辑完的账户信息到服务器
     */
    async editAccountFunc() {
      // 判断
      const res1 = checkInput.accountCheck(this.editAccount.account, this);
      const res2 = checkInput.passwordCheck(this.editAccount.password, this);
      const res3 = checkInput.roleCheck(this.editAccount.roleType, this);

      if (res1 && res2 && res3) {
        // 提交信息
        const res = await this.$axios.post('/admin/account/update', {
          id: this.editAccount.id,
          account: this.editAccount.account,
          password: this.editAccount.password,
          role: this.editAccount.roleType
        })
        this.$message({
          type: res.code === 200 ? "success" : "error",
          message: res.msg
        })
        if (res.code === 200) {
          this.isDrawerShow = false;
          this.getAllAccount();
        }
      }
    },

    /**
     * 删除一个账户
     * @param id -> 需要删除的账户的id
     * @returns {Promise<void>}
     */
    deleteAccount(id) {
      // 弹出框框
      this.$confirm('此操作将永久删除该账户, 是否继续?', '注意', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 提交信息
        const res = await this.$axios.post('/admin/account/delete', {id});
        this.$message({
          type: res.code === 200 ? "success":"error",
          message: res.msg
        })
        if (res.code === 200){
          this.getAllAccount();
        }
      })
    }
  },
  mounted() {
    // 向后端查询全部账户信息
    this.getAllAccount();
  },
  watch: {
    searchAccount: {
      deep: true,
      handler(newVal) {
        if (newVal.searchTypeShow === 'id') {
          newVal.searchTypeData = 'id';
          return;
        }
        if (newVal.searchTypeShow === '账号') {
          newVal.searchTypeData = 'account';
          return;
        }
        if (newVal.searchTypeShow === '职位') {
          newVal.searchTypeData = 'role';
        }
      }
    },
  }
}
</script>

<style scoped>
.tip-title {
  font-size: 14px;
  color: #cecfd1;
  margin-bottom: 10px;
}

.search-type-select {
  width: 10%;
  margin-right: 10px;
}

.search-input {
  width: 25%;
  margin-right: 10px;
}

.account-search-bar,
.add-account {
  margin-bottom: 20px;
}

.account-input,
.password-input,
.check-password-input,
.account-type-select {
  width: 20%;
  margin-right: 15px;
}

/* 抽屉 */
.account-edit-drawer__content {
  height: 100%;
  position: relative;
  padding: 0 20px;
}

.drawer-input {
  width: 90%;
}

.account-edit-drawer__footer {
  position: absolute;
  bottom: 20px;
  right: 20px;
}

.drawer-button {
  width: 100px;
}
</style>