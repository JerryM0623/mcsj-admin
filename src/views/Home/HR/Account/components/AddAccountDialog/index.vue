<template>
    <el-dialog
        class="add-account-dialog"
        title="添加新的账户"
        :visible.sync="dialogVisible"
        :show-close="false"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        width="35%"
    >
        <el-form :model="dialogDataLocal">
            <el-form-item label="账户名称" label-width="100">
                <el-input class="dialog-input" v-model="dialogDataLocal.account"></el-input>
            </el-form-item>
            <el-form-item label="账户密码" label-width="100">
                <el-input type="password" show-password class="dialog-input" v-model="dialogDataLocal.password"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    name: "AddAccountDialog",
    props: {
        // 控制显示与隐藏
        dialogVisible: {
            type: Boolean,
            required: true
        },
        // 关闭弹窗的回调函数
        handleClose: {
            type: Function,
            required: true
        },
        // 添加权限信息的处理函数
        handleSubmit: {
            type: Function,
            required: true
        }
    },
    data() {
        return {
            // 组件本地的存储数据
            dialogDataLocal: {
                account: '',
                password: ''
            }
        }
    },
    methods: {
        /**
         * 点击取消按钮之后的回调函数
         */
        cancel(){
            this.$confirm('你确定要关闭吗？关闭将会丢失全部的数据！','注意',{
                cancelButtonText:'取消',
                confirmButtonText:'确定',
                type: 'warning'
            }).then(() => {
                this.handleClose();
            })
        },
        /**
         * 提交信息
         */
        submit(){
            if (this.dialogDataLocal.account === '' || this.dialogDataLocal.password === ''){
                this.$message.error('请填写信息');
                return;
            }
            this.handleSubmit(this.dialogDataLocal.account, this.dialogDataLocal.password);
        }
    },
    watch: {
        dialogVisible(val) {
            if (val === false){
                this.dialogDataLocal = {
                    account: '',
                    password: ''
                }
            }
        }
    }
}
</script>

<style scoped>

</style>