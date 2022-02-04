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
            searchInput: '',
            paginationOptions: {
                pageSize: 10,
                pageNum: 1,
                currentPage: 1
            },
        }
    },
    methods: {
        /**
         * 分页查询角色权限数据
         */
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


        editRow(row){
            console.log(row);
        },
        deleteRow(row){
            console.log(row);
        },
        addRolePermission(){
            console.log('添加角色权限信息');
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