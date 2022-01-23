<template>
    <div class="role-management">
        <!--  搜索框-->
        <!--<search-bar-->
        <!--    title="搜索角色"-->
        <!--    :options="searchBarOptions"-->
        <!--    :handler-search="filterRoles"-->
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
// import AddDialog from '../../../../components/AddDialog';
import DataTable from '../../../../components/DataTable';
// import EditDrawer from '../../../../components/EditDrawer';
// import SearchBar from '../../../../components/SearchBar';

export default {
    name: "RoleManagement",
    components: {
        // AddDialog,
        // EditDrawer,
        DataTable,
        // SearchBar
    },
    data(){
        return {
            // 搜索栏的配置属性
            searchBarOptions: [
                {value: "id", label: "id", data: "id"},
                {value: "账号", label: "账号", data: "account"},
                {value: "职位", label: "职位", data: "role"},
            ],
        }
    },
    methods:{
        filterRoles(){
            console.log('filterRoles');
        },
        clearSearch(){
            console.log('clearSearch');
        }
    },
    mounted() {
        // 后台请求role的数据
    }
}
</script>

<style scoped>

</style>