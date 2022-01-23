<template>
    <div class="account-management-container">
        <!--  搜索框-->
        <!--<search-bar-->
        <!--    title="搜索账户"-->
        <!--    :options="searchBarOptions"-->
        <!--    :handler-search="filterAccounts"-->
        <!--    :handler-clear="clearSearch"-->
        <!--&gt;</search-bar>-->
        <!--    添加-->
        <!--<add-dialog-->
        <!--    :dialog-options="dialogOptions"-->
        <!--&gt;-->
        <!--    <template v-slot:content>-->
        <!--        <div class="dialog-container">-->
        <!--            <el-form label-width="150px" :model="addAccount">-->
        <!--                <el-form-item label="填写账户">-->
        <!--                    <el-input v-model="addAccount.accountInput"></el-input>-->
        <!--                </el-form-item>-->
        <!--                <el-form-item label="填写密码">-->
        <!--                    <el-input type="password" v-model="addAccount.passwordInput"></el-input>-->
        <!--                </el-form-item>-->
        <!--                <el-form-item label=再次填写密码>-->
        <!--                    <el-input type="password" v-model="addAccount.checkPasswordInput"></el-input>-->
        <!--                </el-form-item>-->
        <!--                <el-form-item label="选择职业">-->
        <!--                    <el-select v-model="addAccount.roleType">-->
        <!--                        <el-option-->
        <!--                            v-for="item in roleList"-->
        <!--                            :key="item.id"-->
        <!--                            :label="item.name"-->
        <!--                            :value="item.name"-->
        <!--                        ></el-option>-->
        <!--                    </el-select>-->
        <!--                </el-form-item>-->
        <!--            </el-form>-->
        <!--            <div slot="footer" class="dialog-footer">-->
        <!--                <el-button @click="closeDialog">取 消</el-button>-->
        <!--                <el-button @click="submitAdd" type="primary">添 加</el-button>-->
        <!--            </div>-->
        <!--        </div>-->
        <!--    </template>-->
        <!--</add-dialog>-->
        <!--  表格-->
        <data-table
            class="account-data-table"
            :data-list="accountDataShow"
            :column-list="DataTableColumn"
            :handle-delete="deleteRow"
            :handle-edit="editRow"
            :handle-open-dialog="openDialog"
        ></data-table>
        <!--        编辑-->
        <!--<edit-drawer-->
        <!--    :drawer-option="drawerOptions"-->
        <!--&gt;-->
        <!--    <template v-slot:content>-->
        <!--        <div class="drawer-container">-->
        <!--            <el-form class="drawer-form" label-width="100">-->
        <!--                <el-form-item label="编辑账户">-->
        <!--                    <el-input class="drawer-input" v-model="editAccount.account"></el-input>-->
        <!--                </el-form-item>-->
        <!--                <el-form-item label="编辑密码">-->
        <!--                    <el-input type="password"-->
        <!--                              v-model="editAccount.password"-->
        <!--                              class="drawer-input"-->
        <!--                    ></el-input>-->
        <!--                </el-form-item>-->
        <!--                <el-form-item label="编辑职业">-->
        <!--                    <el-select v-model="editAccount.roleType">-->
        <!--                        <el-option-->
        <!--                            v-for="item in roleList"-->
        <!--                            :key="item.id"-->
        <!--                            :value="item.name"-->
        <!--                            :label="item.name"-->
        <!--                        >-->
        <!--                        </el-option>-->
        <!--                    </el-select>-->
        <!--                </el-form-item>-->
        <!--            </el-form>-->
        <!--            <div class="drawer-footer">-->
        <!--                <el-button class="drawer-button" @click="closeDrawer">取消</el-button>-->
        <!--                <el-button class="drawer-button" @click="submitEdit" type="primary">提交</el-button>-->
        <!--            </div>-->
        <!--        </div>-->
        <!--    </template>-->
        <!--</edit-drawer>-->
    </div>
</template>

<script>
// import searchBar from '../../../../components/SearchBar';
import DataTable from '../../../../components/DataTable';
// import AddDialog from '../../../../components/AddDialog';
// import EditDrawer from '../../../../components/EditDrawer';

export default {
    name: "AccountManagement",
    components: {
        // searchBar,
        DataTable,
        // AddDialog,
        // EditDrawer
    },
    data() {
        return {
            // 搜索栏的配置属性
            searchBarOptions: [
                {value: "id", label: "id", data: "id"},
                {value: "账号", label: "账号", data: "account"},
                {value: "职位", label: "职位", data: "role"},
            ],
            // 表格列的配置属性
            DataTableColumn: [
                {prop: "id", label: "用户编号", width: "80", align: "center"},
                {prop: "account", label: "账号", align: "center"},
                {prop: "password", label: "密码", align: "center"},
                {prop: "role", label: "职位", align: "center"},
            ],
            // 添加系列的配置属性
            dialogOptions: {
                isDialogShow: false,
                title: "添加新账户"
            },
            // 抽屉的配置属性
            drawerOptions: {
                isDrawerShow: false, // 开关
                drawerDirection: 'ltr', // 打开方向
                showClose: false,  // 关闭按钮的开关
                wrapperClosable: false, // 遮罩关闭抽屉开关
                title: '编辑账户数据' // 标题
            },
            // 存放数据库中 role 的列表
            roleList: [],
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
            // 后端返回的数据
            accountData: [],
            accountDataShow: [],
        }
    },
    methods: {
        /**
         * 向后台请求所有的 role
         */
        async getAllRoles() {
            // 发送请求
            const {code, data} = await this.$axios.get('/admin/account/role/all');
            if (code === 500) return;
            this.roleList = data;
        },
        /**
         * 查询全部账户信息的函数
         */
        async getAllAccount() {
            try {
                // 开启 loading 遮罩
                this.loading = true;
                // 发送请求
                const res = await this.$axios.get('/admin/account/all');
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
        filterAccounts(selectResult, searchInput) {
            // 判断
            if (!selectResult) {
                this.$message({
                    type: "warning",
                    message: "请选择类型"
                })
                return;
            }
            if (!searchInput) {
                this.$message({
                    type: "warning",
                    message: "请输入关键字"
                })
                return;
            }
            // 两个都输入了,根据传入的类型进行 filter
            const res = this.accountData.filter((item) => {
                return item[selectResult].toString() === searchInput;
            })
            this.accountDataShow = res.sort((a, b) => {
                return a.id - b.id;
            })
        },

        /**
         * 清除搜索结果
         */
        clearSearch() {
            this.accountDataShow = this.accountData;
        },

        /**
         * 开启 dialog
         */
        openDialog() {
            this.dialogOptions.isDialogShow = true;
        },

        /**
         * 关闭 dialog
         */
        closeDialog() {
            this.$confirm('现在退出数据将不会保存', '注意', {
                confirmButtonText: '确定退出',
                cancelButtonText: '取消退出',
                type: 'warning',
            }).then(() => {
                this.dialogOptions.isDialogShow = false;
            })
        },

        /**
         * 添加用户的方法
         */
        async submitAdd() {
            // 获取数据
            const {accountInput, passwordInput, checkPasswordInput, roleType} = this.addAccount;

            // 判断单独存储变量
            const judgeAccount = !accountInput || accountInput.length < 6 || accountInput.length > 16;
            const judgePassword = !passwordInput || passwordInput.length < 6 || passwordInput.length > 16;
            const judgeCheckPass = !checkPasswordInput || checkPasswordInput !== passwordInput;
            const judgeRole = !roleType;

            // 判断
            if (judgeAccount) {
                this.$message.warning('账号的长度在6-16之间，请检查。')
                return;
            }
            if (judgePassword) {
                this.$message.warning('密码的长度在6-16之间，请检查。')
                return;
            }
            if (judgeCheckPass) {
                this.$message.warning('两次密码输入不一致，请检查')
                return;
            }
            if (judgeRole) {
                this.$message.warning('请选择职业');
                return;
            }

            // 发起请求
            const {code, msg} = await this.$axios.post('/admin/account/add', {
                account: accountInput,
                password: passwordInput,
                role: roleType
            })

            // 输出消息
            if (code === 500) {
                this.$message.error(msg);
            }
            this.$message.success(msg);

            // 清空数据
            this.addAccount.accountInput = '';
            this.addAccount.passwordInput = '';
            this.addAccount.checkPasswordInput = '';
            this.addAccount.roleType = '';

            // 关闭 dialog
            this.dialogOptions.isDialogShow = false;

            // 刷新表格
            await this.getAllAccount();
        },

        /**
         * 点击编辑按钮开启 drawer
         */
        editRow(row) {
            // 配置数据
            const {id, account, password, role} = row;
            this.editAccount.id = id;
            this.editAccount.account = account;
            this.editAccount.password = password;
            this.editAccount.roleType = role;
            // 开启抽屉
            this.drawerOptions.isDrawerShow = true;
        },

        /**
         * 关闭 drawer
         */
        closeDrawer() {
            this.$confirm('现在退出数据将不会保存', '注意', {
                confirmButtonText: '确定退出',
                cancelButtonText: '取消退出',
                type: 'warning',
            }).then(() => {
                this.drawerOptions.isDrawerShow = false;
            })
        },

        /**
         * 提交修改
         */
        async submitEdit() {
            // 获取数据
            const {id, account, password, roleType} = this.editAccount;

            // 变量化
            const judgeId = !id;
            const judgeAccount = !account || account.length < 6 || account.length > 16;
            const judgePassWord = !password || password.length < 6 || password.length > 16;
            const judgeRole = !roleType

            // 判断
            if (judgeId) {
                this.$message.warning('数据不完整，无法提交数据，请重试')
                return;
            }
            if (judgeAccount) {
                this.$message.warning('账号的长度在6-16之间，请检查。')
                return;
            }
            if (judgePassWord) {
                this.$message.warning('密码的长度在6-16之间，请检查。')
                return;
            }
            if (judgeRole) {
                this.$message.warning('请选择职业')
                return;
            }

            // 发请求
            // 提交信息
            const {code, msg} = await this.$axios.post('/admin/account/update', {
                id,
                account,
                password,
                role: roleType
            })

            // 后台处理失败
            if (code === 500) {
                this.$message.error(msg);
                return;
            }

            // 后台处理成功
            this.$message.success(msg);

            // 关闭 drawer
            this.drawerOptions.isDrawerShow = false;

            // 更新表格数据
            await this.getAllAccount();
        },

        /**
         * 删除一行数据
         */
        deleteRow(row) {

            const {id} = row;

            this.$confirm('确定删除？该操作将无法撤回！', '注意', {
                confirmButtonText: "确认删除",
                cancelButtonText: "取消删除",
                type: "warning"
            }).then(async () => {
                // 后台通信
                const {code, msg} = await this.$axios.post('/admin/account/delete', {id});
                // 后台失败消息
                if (code === 500) {
                    this.$message.error(msg);
                    return;
                }
                // 后台成功消息
                this.$message.success(msg);
                // 更新数据
                await this.getAllAccount();
            })
        },
    },
    mounted() {
        // 获取职业类型
        this.getAllRoles();
        // 向后端查询全部账户信息
        this.getAllAccount();
    },
}
</script>

<style scoped>
.dialog-footer {
    /*margin-top: 50px;*/
    padding-left: calc(100% - 220px);
}

.dialog-footer > button {
    width: 100px;
}

.drawer-container {
    position: relative;
    height: 100%;
    padding-left: 20px;
}

.drawer-container > form {
    width: 400px;
}

.drawer-footer {
    position: absolute;
    bottom: 20px;
}

.drawer-footer > button {
    width: 200px;
}

.drawer-input {
    width: calc(100% - 70px);
}
</style>