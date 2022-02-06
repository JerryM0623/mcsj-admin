<template>
    <el-dialog
        class="role-permission-dialog"
        title="删除职位"
        :visible.sync="dialogVisible"
        :show-close="false"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        width="35%"
    >
        <el-form>
            <el-form-item label="职位名称" label-width="100">
                <el-select v-model="roleValue" placeholder="请选择需要删除的职位">
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
    name: "DeleteRoleDialog",
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
    data(){
        return {
            roleValue: '',
            roleOptions: []
        }
    },
    methods: {
        cancel(){
            this.$confirm('你确定要关闭嘛，关闭将会丢失全部的数据！','注意',{
                cancelButtonText:'取消',
                confirmButtonText:'确定',
                type: 'warning'
            }).then(() => {
                this.handleClose();
            })
        },
        submit(){
            console.log('DeleteRoleDialog submit()...');
            const { roleValue } = this;
            if (roleValue === ''){
                this.$message.error('请选择数据');
                return;
            }
            this.handleSubmit(roleValue);
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
    },
    watch: {
        dialogVisible(val){
            if (val === true){
                this.getAllRole();
            }
            if (val === false){
                this.roleValue = '';
                this.roleOptions = [];
            }
        }
    }
}
</script>

<style scoped>

</style>