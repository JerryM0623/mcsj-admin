<template>
    <el-dialog
        class="permission-dialog"
        :title="transformDialogTitle"
        :visible.sync="dialogVisible"
        :show-close="false"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        width="35%"
    >
        <el-form :model="dialogDataLocal">
            <el-form-item label="权限名称" label-width="100">
                <el-input class="dialog-input" v-model="dialogDataLocal.permissionName"></el-input>
            </el-form-item>
            <el-form-item label="权限释义" label-width="100">
                <el-input class="dialog-input" v-model="dialogDataLocal.permissionComment"></el-input>
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
    name: "PermissionDialog",
    props: {
        // dialog的数据
        dialogData: {
            type: Object,
            required: true
        },
        // dialog的模式，默认位 create 表示初始化状态
        dialogMode: {
            type: String,
            required: true,
            default: 'create',
            validate(value) {
                return value.indexOf('edit') || value.indexOf('create')
            }
        },
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
        handleSubmitAdd: {
            type: Function,
            required: true
        },
        // 编辑权限信息的处理函数
        handleSubmitEdit: {
            type: Function,
            required: true
        }
    },
    data() {
        return {
            // 组件本地的存储数据
            dialogDataLocal: {
                // 权限id, 默认是-1
                permissionID: -1,
                // 权限名称， 默认为空
                permissionName: '',
                // 权限释义， 默认为空
                permissionComment: ''
            }
        }
    },
    methods: {
        /**
         * 点击取消按钮的方法
         */
        cancel() {
            this.$confirm('确定退出？现在退出将会丢失已编辑内容！', '注意', {
                cancelButtonText: '取消',
                confirmButtonText: '确定',
                type: 'warning'
            }).then(() => {
                // 触发父元素的回调方法
                this.handleClose();
            })
        },

        /**
         * 提交数据
         */
        submit() {
            const {permissionID, permissionName, permissionComment} = this.dialogDataLocal;
            // 检验
            if (!permissionID || !permissionName || !permissionComment) {
                this.$message.error('请填写完整数据');
                return;
            }

            // 根据 mode 触发不同的方法
            if (this.dialogMode === 'create') {
                this.handleSubmitAdd(permissionName, permissionComment);
            } else {
                this.handleSubmitEdit(permissionID, permissionName, permissionComment);
            }
        }
    },
    computed: {
        /**
         * 设置标题
         * @returns {*}
         */
        transformDialogTitle() {
            const mode = this.dialogMode;
            const titleObj = {
                'create': '添加权限信息',
                'edit': '编辑权限信息'
            }
            return titleObj[mode];
        }
    },
    watch: {
        dialogVisible(val) {
            if (val === true) {
                this.dialogDataLocal = this.dialogData;
            }
        }
    }
}
</script>

<style scoped>
.dialog-input {
    width: calc(100% - 68px);
}

.dialog-footer > button {
    width: 100px;
}
</style>