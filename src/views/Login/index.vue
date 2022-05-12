<template>
  <div class="login-container">
    <el-form
        :model="loginForm"
        :rules="loginFormRules"
        ref="loginForm"
        label-width="60px"
        class="login-form"
    >
      <h2 class="login-form-title">门窗视界后台管理系统</h2>
      <el-form-item label="账号" prop="account">
        <el-input v-model="loginForm.account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-bottom" type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        account: '',
        password: ''
      },
      loginFormRules: {
        account: [
          {required: true, message: '请输入账号', trigger: 'blur'},
          {min: 6, max: 16, message: '账号长度在 6 到 16 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 16, message: '密码长度在 6 到 16 个字符', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    // 登录
    async login() {
      // 获取数据
      const {account, password} = this.loginForm;
      // 账号验证的结果
      const res = await this.$axios.post('/admin/login', { account, password })
      // 写入用户信息
      const newResData = {
        ...res.data,
        timeStamp: Date.now()
      }
      localStorage.setItem('accountInfo',JSON.stringify(newResData));
      this.$message({
        type: res.code === 200 ? "success" : "error",
        message:res.msg
      })
      if (res.code === 200){
        await this.$store.dispatch('setAccountInfo',newResData);
      }
      // 跳转
      await this.$router.push(newResData.roleId === 1 ? '/hr/account' : '/carousel');
    }
  },
}
</script>

<style scoped>
.login-container {
  position: relative;
  height: 100%;
  width: 100%;
  background-image: url("../../assets/images/common/background.png");
  background-repeat: no-repeat;
  background-size: cover;
}

/* 表单样式 */
.login-form {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 40px;
  width: 500px;
  height: 300px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
}

.login-form-title {
  text-align: center;
  margin-bottom: 30px;
  font-weight: 700;
  font-size: 26px;
}

.login-bottom {
  width: 100%;
}
</style>