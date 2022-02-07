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
                    <el-button @click="addAccount" type="primary">添加账户</el-button>
                    <el-button @click="addAccountRole" type="primary">添加职位关系</el-button>
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
        </el-card>
    </div>
</template>

<script>
import AccountTable from './components/AccountTable';
import {mapState} from "vuex";

export default {
    name: "AccountManagement",
    components: {
        AccountTable,
    },
    data() {
        return {
            paginationOptions: {
                pageSize: 10,
                currentPage: 1
            },
            searchInput: '',

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
        searchAccountRole(){},
        clearSearch(){},
        addAccount(){},
        addAccountRole(){},
        deleteAccount(){},
        deleteRow(row){
            console.log('deleteRowAccount', row);
        },
        editRow(row){
            console.log('EditRowAccount', row);
        },
        pageNumChange(num){
            console.log('账户管理页面的分页组件页面更改：', num);
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