<template>
    <el-table
        class="account-table"
        :data="tableData"
        stripe
        border
        highlight-current-row
        style="width: 100%">
        <el-table-column
            prop="id"
            label="编号"
            width="70"
            align="center">
        </el-table-column>
        <el-table-column
            prop="account"
            label="账户"
            align="center">
        </el-table-column>
        <el-table-column
            prop="password"
            label="密码"
            align="center">
        </el-table-column>
        <el-table-column
            prop="role"
            label="职位"
            align="center">
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="150"
            align="center">
            <template slot-scope="scope">
                <el-button size="small" type="primary" @click="editRow(scope.row)">编辑</el-button>
                <el-button size="small" type="danger" @click="deleteRow(scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    name: "AccountTable",
    props: {
        // 表格所显示数据
        tableData: {
            type: Array,
            required: true
        },
        // 执行编辑的回调函数
        handleEdit: {
            type: Function,
            required: true
        },
        // 执行删除的回调函数
        handleDelete: {
            type: Function,
            required: true
        },
    },
    methods: {
        editRow(row){
            this.handleEdit(row);
        },
        deleteRow(row){
            console.log('delete',row);
        }
    }
}
</script>

<style scoped>

</style>