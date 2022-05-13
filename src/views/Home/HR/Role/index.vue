<template>
    <div class="role">
        <el-card v-if="roleId === 1">
            <!--功能区-->
            <el-row style="margin-bottom: 10px">
                <el-col :span="6">
                    <el-input v-model="searchInput" style="width: 100%" placeholder="请键入数据进行搜索"></el-input>
                </el-col>
                <el-col :span="18">
                    <el-button @click="searchRolePermission" type="primary" style="margin-left: 10px">搜索</el-button>
                    <el-button @click="clearSearch" type="primary">清除搜索信息</el-button>
                    <el-button @click="addRole" type="primary">添加职位</el-button>
                    <el-button @click="addRolePermission" type="primary">添加权限关系</el-button>
                    <el-button @click="deleteRole" type="danger">删除职位</el-button>
                </el-col>
            </el-row>
            <!--数据显示表格-->
            <role-table
                :table-data="rolePermissionList.showList"
                :handle-delete="deleteRow"
            ></role-table>
            <!--分页组件-->
            <el-pagination
                style="margin-top: 10px"
                background
                layout="prev, pager, next"
                :total="rolePermissionList.total"
                @current-change="pageNumChange"
                :current-page.sync="paginationOptions.currentPage"
            >
            </el-pagination>
            <!--添加职位的 dialog-->
            <role-dialog
                :dialog-visible="roleDialogVisible"
                :handle-close="addRoleCancel"
                :handle-submit="addRoleSubmit"
            ></role-dialog>
            <!--添加只为权限的dialog-->
            <role-permission-dialog
                :dialog-visible="rolePermissionDialogVisible"
                :handle-submit="addRolePermissionSubmit"
                :handle-close="addRolePermissionCancel"
            ></role-permission-dialog>
            <!--删除 role 的 dialog-->
            <delete-role-dialog
                :handle-close="deleteRoleCancel"
                :handle-submit="deleteRoleSubmit"
                :dialog-visible="deleteRoleDialogVisible"
            ></delete-role-dialog>
        </el-card>
      <FZT v-else></FZT>
    </div>
</template>

<script>
import RoleTable from './components/RoleTable';
import RoleDialog from './components/RoleDialog';
import RolePermissionDialog from './components/RolePermissionDialog';
import DeleteRoleDialog from './components/DeleteRoleDialog';
import FZT from '../../../../components/fzt/index';
import {mapState} from "vuex";
export default {
    name: "Role",
    components: {
        RoleTable,
        RoleDialog,
        RolePermissionDialog,
        DeleteRoleDialog,
        FZT
    },
    data(){
        return{
            searchInput: '',
            paginationOptions: {
                pageSize: 10,
                pageNum: 1,
                currentPage: 1
            },
            roleDialogVisible: false,
            rolePermissionDialogVisible: false,
            deleteRoleDialogVisible: false,
            roleId: JSON.parse(localStorage.getItem('accountInfo')).roleId
        }
    },
    methods: {
        /**
         * 分页查询角色权限数据
         */
        async getRolePermissionDataByPageNum(pageNum = this.paginationOptions.pageNum,
                                       pageSize = this.paginationOptions.pageSize){
            try {
                const {code, msg, data} = await this.$axios.get('/admin/role/page',{
                    params:{
                        pageNum,
                        pageSize
                    }
                })
                if (code !== 200){
                    this.$message.error(msg);
                    return;
                }
                await this.$store.dispatch('setRolePermissionData', data);
            }catch (e) {
                console.log(e);
            }
        },

        /**
         * 根据关键词进行搜索
         */
        searchRolePermission(){
            const keyWord = this.searchInput;
            if (keyWord.length <= 0){
                this.$message.error('请输入关键字');
                return;
            }
            this.$store.dispatch('searchRolePermission', keyWord);
        },

        /**
         * 清除搜索的所有痕迹
         */
        clearSearch(){
            this.searchInput = '';
            this.$store.dispatch('clearSearchRolePermission');
        },

        /**
         * 开启 roleDialog
         */
        addRole(){
            this.roleDialogVisible = true;
        },

        /**
         * 添加职位的 dialog 点击取消之后的回调函数
         */
        addRoleCancel(){
            this.roleDialogVisible = false;
        },

        /**
         * 添加职位的 dialog 点击提交之后的回调函数
         */
        async addRoleSubmit(roleName){
            try {
                const { code, msg } = await this.$axios.post('/admin/role/add-role',{
                    roleName
                })
                // 弹出信息
                this.$message({
                    type: code === 200 ? 'success' : 'error',
                    message: msg
                })
                this.roleDialogVisible = false;
            }catch (e) {
                console.log(e);
                this.$message.error('请求出错');
            }
        },

        /**
         * 开启添加职位权限的回调函数
         */
        addRolePermission(){
            this.rolePermissionDialogVisible = true;
        },

        /**
         * 添加职位权限关系的dialog选择取消的回调函数
         */
        addRolePermissionCancel(){
            this.rolePermissionDialogVisible = false;
        },

        /**
         * 添加只为权限关系的dialog选择提交的回调函数
         */
        async addRolePermissionSubmit(roleValue, permissionValue){
            const { code, msg } = await this.$axios.post('/admin/role/add-role-permission', {
                roleValue,
                permissionValue
            })
            if (code !== 200) {
                this.$message.error(msg);
                return;
            }
            this.rolePermissionDialogVisible = false;
            this.paginationOptions.currentPage = 1;
            await this.getRolePermissionDataByPageNum(this.paginationOptions.currentPage);
            this.$message.success(msg);
        },

        /**
         * 点击开启删除职位的dialog
         */
        deleteRole(){
            this.deleteRoleDialogVisible = true;
        },

        /**
         * 点击dialog的取消按钮的回调函数
         */
        deleteRoleCancel(){
            this.deleteRoleDialogVisible = false;
        },

        /**
         *
         */
        async deleteRoleSubmit(roleValue){
            const { code, msg } = await this.$axios.post('/admin/role/del-role', {
                roleValue
            })
            if (code !== 200) {
                this.$message.error(msg);
                return;
            }
            this.deleteRoleDialogVisible = false;
            this.paginationOptions.currentPage = 1;
            await this.getRolePermissionDataByPageNum(this.paginationOptions.currentPage);
            this.$message.success(msg);
        },

        /**
         * 删除一条职位权限信息
         */
        deleteRow(row){
            this.$confirm('你确定要删除这条对应关系？，删除操作是不可逆的！','注意',{
                cancelButtonText:'取消',
                confirmButtonText:'确定',
                type: 'warning'
            }).then(async () => {
                console.log(row);
                try {
                    const { code, msg } = await this.$axios.post('/admin/role/delete-role-permission',{
                        id:row.rolePermissionID
                    });
                    if (code !== 200){
                        this.$message.error(msg);
                        return;
                    }
                    this.paginationOptions.currentPage = 1;
                    await this.getRolePermissionDataByPageNum(this.paginationOptions.currentPage);
                    this.$message.success(msg);
                } catch (e) {
                    console.log(e);
                    this.$message.error('请求失败');
                }
            })
        },

        /**
         * 分页组件换页时的事件回调
         * @param pageNum
         */
        pageNumChange(pageNum) {
            this.getRolePermissionDataByPageNum(pageNum);
        }
    },
    computed: {
        ...mapState(['rolePermissionList'])
    },
    mounted() {
        this.getRolePermissionDataByPageNum();
    }
}
</script>

<style scoped>

</style>