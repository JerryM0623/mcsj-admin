<template>
    <div class="role">
        <el-card>
            <!--功能区-->
            <el-row style="margin-bottom: 10px">
                <el-col :span="6">
                    <el-input v-model="searchInput" style="width: 100%" placeholder="请键入数据进行搜索"></el-input>
                </el-col>
                <el-col :span="18">
                    <el-button @click="searchRolePermission" type="primary" style="margin-left: 10px">搜索</el-button>
                    <el-button @click="clearSearch" type="primary">清除搜索信息</el-button>
                    <el-button @click="addRolePermission" type="primary">添加角色</el-button>
                </el-col>
            </el-row>
            <!--数据显示表格-->
            <role-table
                :table-data="rolePermissionList.showList"
                :handle-edit="editRow"
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
            <!--编辑/新建的dialog-->
        </el-card>
    </div>
</template>

<script>
import RoleTable from './components/RoleTable';
import {mapState} from "vuex";
export default {
    name: "Role",
    components: {
        RoleTable,
    },
    data(){
        return{
            roleTableOptions:{
                data:[
                    { roleID: 1, roleName: 'ndj', rolePermission: '员工账户管理、职位管理、权限管理' },
                    { roleID: 2, roleName: 'fdw', rolePermission: '员工账户管理、职位管理、权限管理' },
                    { roleID: 3, roleName: 'mde', rolePermission: '员工账户管理、职位管理、权限管理' },
                ]
            },
            searchInput: '',
            paginationOptions: {
                pageSize: 10,
                pageNum: 1,
                currentPage: 1
            },
        }
    },
    methods: {
        async getRolePermissionDataByPageNum(pageNum = this.paginationOptions.pageNum,
                                       pageSize = this.paginationOptions.pageSize){
            try {
                const {code, msg, data} = await this.$axios.get('/admin/role/all',{
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
        editRow(row){
            console.log(row);
        },
        deleteRow(row){
            console.log(row);
        },
        searchRolePermission(){
            console.log('搜索角色权限');
        },
        clearSearch(){
            console.log('清楚搜索痕迹');
        },
        addRolePermission(){
            console.log('添加角色权限信息');
        },
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