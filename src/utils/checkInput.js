/* 这个文件里面的工具函数用于检测输入的内容 */

const accountCheck = (account, that) => {
    if(!account){
        that.$message({
            type: "error",
            message:"请填写账号"
        })
        return false;
    }
    if (account.length < 6 || account.length > 16){
        that.$message({
            type: "error",
            message:"账号的长度在6-16之间哦！"
        })
        return false;
    }
    return true;
}

const passwordCheck = (password, that) => {
    if(!password){
        that.$message({
            type: "error",
            message:"请填写密码"
        })
        return false;
    }
    if (password.length < 6 || password.length > 16){
        that.$message({
            type: "error",
            message:"密码的长度在6-16之间哦！"
        })
        return false;
    }
    return true;
}

const rePasswordCheck = (password, rePassword, that) => {
    if(!rePassword){
        that.$message({
            type: "error",
            message:"请填写账号"
        })
        return false;
    }
    if (rePassword !== password){
        that.$message({
            type: "error",
            message:"两次输入的账号不一致哦"
        })
        return false;
    }
    return true;
}

const roleCheck = (role, that) => {
    if(!role){
        that.$message({
            type: "error",
            message:"请选择职业类型"
        })
        return false;
    }
    return true;
}

export default {
    accountCheck,
    passwordCheck,
    rePasswordCheck,
    roleCheck
}