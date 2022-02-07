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
                <el-select v-model="accountValue" placeholder="请选择">
                    <el-option
                        v-for="item in accountOptions"
                        :key="item.id"
                        :label="item.account"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="职位名称" label-width="100">
                <el-select v-model="roleValue" placeholder="请选择">
                    <el-option
                        v-for="item in roleOptions"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
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
    name: "AccountRoleDialog",
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
            accountOptions:[],
            roleOptions:[],
            accountValue: '',
            roleValue: ''

        }
    },
    methods: {
        async getAllAccounts(){
            const { code, msg, data } = await this.$axios.get('/admin/account/all');
            if (code !== 200){
                this.$message.error(msg);
                return;
            }
            this.accountOptions = data;
        },
        /**
         * 请求后端的职位数据
         */
        async getAllRole(){
            const { code, msg, data } = await this.$axios.get('/admin/role/all');
            if (code !== 200){
                this.$message.error(msg);
                return;
            }
            this.roleOptions = data;
        },
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
            if (this.accountValue === '' || this.roleValue === ''){
                this.$message.error('请填写信息');
                return;
            }
            this.handleSubmit(this.accountValue, this.roleValue);
        }
    },
    watch: {
        dialogVisible(val) {
            if (val === false){
                this.accountOptions = [];
                this.accountValue = '';
                this.roleOptions = [];
                this.roleValue = '';
            }else {
                this.getAllAccounts();
                this.getAllRole();
            }
        }
    }
}
</script>

<style scoped>

</style>