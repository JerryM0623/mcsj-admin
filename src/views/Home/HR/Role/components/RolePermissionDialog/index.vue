<template>
    <el-dialog
        class="role-permission-dialog"
        title="为职位添加新的关系"
        :visible.sync="dialogVisible"
        :show-close="false"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        width="35%"
    >
        <el-form>
            <el-form-item label="职位名称" label-width="100">
                <el-select v-model="roleValue" placeholder="请选择职位">
                    <el-option
                        v-for="item in roleOptions"
                        :key="item.id"
                        :label="item.comment"
                        :value="item.name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="权限名称" label-width="100">
                <el-select v-model="permissionValue" placeholder="请选择权限">
                    <el-option
                        v-for="item in permissionOptions"
                        :key="item.id"
                        :label="item.comment"
                        :value="item.name">
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
    name: "RolePermissionDialog",
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
            roleValue: '',
            permissionValue: '',
            roleOptions: [],
            permissionOptions: []
        }
    },
    methods: {
        /**
         * 点击取消按钮之后的回调函数
         */
        cancel(){
            this.$confirm('你确定要关闭嘛，关闭将会丢失全部的数据！','注意',{
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
            const { roleValue, permissionValue } = this;
            if (roleValue === '' || permissionValue === ''){
                this.$message.error('请选择数据');
                return;
            }
            this.handleSubmit(roleValue, permissionValue);
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
         * 请求后端的权限数据
         * @returns {Promise<void>}
         */
        async getPermission(){
            const { code, msg, data } = await this.$axios.get('/admin/permission/all');
            if (code !== 200){
                this.$message.error(msg);
                return;
            }
            this.permissionOptions = data;
        }
    },
    watch: {
        dialogVisible(val) {
            if (val === true){
                console.log('RolePermissionDialog开启显示');
                // 往服务器请求数据
                this.getAllRole();
                this.getPermission();
                //
            }
            if (val === false){
                console.log('RolePermissionDialog关闭显示');
                this.roleValue = '';
                this.permissionValue = '';
                this.roleOptions = [];
                this.permissionOptions = [];
            }
        }
    }
}
</script>

<style scoped>

</style>