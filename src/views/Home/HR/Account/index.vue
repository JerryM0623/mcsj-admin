<template>
    <div class="account">

        <el-card>
            <!--功能区-->
            <el-row style="margin-bottom: 10px">
                <el-col :span="6">
                    <el-input v-model="searchInput" style="width: 100%" placeholder="请键入数据进行搜索"></el-input>
                </el-col>
                <el-col :span="18">
                    <el-button @click="searchAccountRole" type="primary" style="margin-left: 10px">搜索</el-button>
                    <el-button @click="clearSearch" type="primary">清除搜索信息</el-button>
                    <el-button @click="addAccount" type="primary">创建账户</el-button>
                    <el-button @click="addAccountRole" type="primary">为账户设置职位</el-button>
                    <el-button @click="deleteAccount" type="danger">删除账户</el-button>
                </el-col>
            </el-row>
            <!--数据显示表格-->
            <account-table
                :table-data="accountList.showList"
                :handle-delete="deleteRow"
                :handle-edit="editRow"
            ></account-table>
            <!--分页组件-->
            <el-pagination
                style="margin-top: 10px"
                background
                layout="prev, pager, next"
                :total="accountList.total"
                @current-change="pageNumChange"
                :current-page.sync="paginationOptions.currentPage"
            >
            </el-pagination>
            <!--添加账户的 dialog-->
            <add-account-dialog
                :dialog-visible="addAccountDialogVisible"
                :handle-submit-add="addAccountSubmit"
                :handle-submit-edit="editRowSubmit"
                :handle-close="addAccountCancel"
                :dialog-mode="addAccountDialogMode"
                :dialog-data="addAccountDialogData"
            ></add-account-dialog>
            <!--为账户赋予职位-->
            <account-role-dialog
                :dialog-visible="accountRoleDialogVisible"
                :handle-close="addAccountRoleCancel"
                :handle-submit="addAccountRoleSubmit"
            ></account-role-dialog>
            <!--删除账户-->
            <delete-account-dialog
                :handle-submit="deleteAccountSubmit"
                :handle-close="deleteAccountCancel"
                :dialog-visible="deleteAccountVisible"
            ></delete-account-dialog>
        </el-card>
    </div>
</template>

<script>
import AccountTable from './components/AccountTable';
import AddAccountDialog from './components/AddAccountDialog';
import AccountRoleDialog from './components/AccountRoleDialog';
import DeleteAccountDialog from './components/DeleteAccountDialog';
import {mapState} from "vuex";

export default {
    name: "AccountManagement",
    components: {
        AccountTable,
        AddAccountDialog,
        AccountRoleDialog,
        DeleteAccountDialog
    },
    data() {
        return {
            paginationOptions: {
                pageSize: 10,
                currentPage: 1
            },
            searchInput: '',
            addAccountDialogVisible: false,
            addAccountDialogMode: 'pengding',
            addAccountDialogData: {
                id: 0,
                account: '',
                password: ''
            },
            accountRoleDialogVisible: false,
            deleteAccountVisible: false,

        }
    },
    methods: {
        /**
         * 分页请求账户列表的数据
         * @param pageNum 默认为1
         * @param pageSize 默认为 this.paginationOptions.pageSize 的值
         * @returns {Promise<void>}
         */
        async getAccountByPageNum(pageNum = 1, pageSize = this.paginationOptions.pageSize){
            try {
                const { code, msg, data } = await this.$axios.get('/admin/account/page',{
                    params: {
                        pageNum,
                        pageSize
                    }
                })
                if (code !== 200){
                    this.$message.error(msg);
                    return;
                }
                await this.$store.dispatch('setAccountData', data);
            }catch (e) {
                console.log(e);
                this.$message.error('请求失败，请重新尝试请求');
            }
        },

        /**
         * 根据关键词键入搜索数据
         */
        searchAccountRole(){
            if (this.searchInput === ''){
                this.$message.error('请在输入框中输入内容');
                return;
            }
            this.$store.dispatch('searchAccountRole', this.searchInput);
        },

        /**
         * 清除所有的搜索痕迹
         */
        clearSearch(){
            this.searchInput = '';
            this.$store.dispatch('clearSearchAccountRole');
        },

        /**
         * 控制添加账户 dialog 的显示与隐藏
         */
        addAccount(){
            this.addAccountDialogVisible = true;
            this.addAccountDialogMode = 'create';
        },

        /**
         * 添加账户 dialog 点击取消按钮之后的回调函数
         */
        addAccountCancel(){
            this.addAccountDialogVisible = false;
            this.addAccountDialogMode = 'pengding';
        },

        /**
         * 添加账户 dialog 点击提交之后的回调函数
         */
        async addAccountSubmit(account, password){
            try {
                const { code, msg } = await this.$axios.post('/admin/account/add-account',{
                    account,
                    password
                })
                if (code !== 200){
                    this.$message.error(msg);
                    return;
                }
                this.$message.success(msg);
                this.addAccountDialogVisible = false;
            }catch (e) {
                console.log(e);
                this.$message.error('操作失败，请重试');
            }
        },

        /**
         * 控制 账户职位 dialog 的显示
         */
        addAccountRole(){
            this.accountRoleDialogVisible = true;
        },

        /**
         * 控制 账户职位 dialog 的隐藏
         */
        addAccountRoleCancel(){
            this.accountRoleDialogVisible = false;
        },

        /**
         * 设置账户职位的提交回调函数
         * @param accountID
         * @param roleID
         * @returns {Promise<void>}
         */
        async addAccountRoleSubmit(accountID, roleID){
            try {
                const { code, msg } = await this.$axios.post('/admin/account/set-account-role', {
                    accountID,
                    roleID
                })
                this.$message({
                    message: msg,
                    type: code === 200 ? 'success' : 'error'
                })
                if (code !== 200) return;
                this.accountRoleDialogVisible = false;
                await this.getAccountByPageNum(this.paginationOptions.currentPage);
            }catch (e) {
                console.log(e);
                this.$message.error('请求失败，请稍后重试');
            }
        },

        /**
         * 控制 deleteDialog 的显示
         */
        deleteAccount(){
            this.deleteAccountVisible = true;
        },

        /**
         * 控制 deleteDialog 的隐藏
         */
        deleteAccountCancel(){
            this.deleteAccountVisible = false;
        },

        /**
         * 删除账号的提交后台的回调函数
         * @param accountID
         * @returns {Promise<void>}
         */
        async deleteAccountSubmit(accountID){
            try {
                const { code, msg } = await this.$axios.post('/admin/account/del',{accountID});
                this.$message({
                    type: code === 200 ? 'success' : "error",
                    message: msg
                })
                if (code !== 200) return;
                this.deleteAccountVisible = false;
                await this.getAccountByPageNum(this.paginationOptions.currentPage);
            }catch (e) {
                console.log(e);
                this.$message.error('请求失败');
            }
        },

        /**
         * 开启 dialog
         */
        editRow(row){
            this.addAccountDialogVisible = true;
            this.addAccountDialogMode = 'edit';
            this.addAccountDialogData = {
                id: row.id,
                account: row.account,
                password: row.password,
                role: row.role
            }
        },

        /**
         * 编辑一条信息的提交信息回调函数
         * @param data
         * @returns {Promise<void>}
         */
        async editRowSubmit(data){
            try {
                const { id, account, password, role } = data;
                const { code, msg } = await this.$axios.post('/admin/account/edit', {
                    id,
                    account,
                    password,
                    role
                })
                this.$message({
                    type: code === 200? 'success':'error',
                    message: msg
                })
                if (code !== 200) return;
                this.addAccountDialogVisible = false;
                this.addAccountDialogMode = 'pending';
                await this.getAccountByPageNum(this.paginationOptions.currentPage);
            }catch (e) {
                console.log(e);
                this.$message.error('请求失败');
            }
        },

        deleteRow(row){
            console.log('deleteRowAccount', row);
        },
        /**
         * 分页器变化的时候实现数据更新
         * @param num
         */
        pageNumChange(num){
            this.getAccountByPageNum(num);
        }
    },
    computed: {
        ...mapState(['accountList'])
    },
    mounted() {
        // 查询第一页的数据(不传数据默认查询第一页)
        this.getAccountByPageNum();
    },
}
</script>

<style scoped>
</style>