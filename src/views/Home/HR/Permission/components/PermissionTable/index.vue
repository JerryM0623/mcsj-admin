<template>
    <div class="permission-table">
        <el-table
            :data="tableData"
            stripe
            border
            highlight-current-row
            style="width: 100%">
            <el-table-column
                prop="permissionID"
                label="编号"
                width="100"
                align="center">
            </el-table-column>
            <el-table-column
                prop="permissionName"
                label="权限名称"
                align="center">
            </el-table-column>
            <el-table-column
                prop="permissionComment"
                label="权限释义"
                align="center">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="200"
                align="center">
                <template slot-scope="scope">
                    <el-button size="small" type="primary" @click="editRow(scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="deleteRow(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: "PermissionTable",
    props: {
        // 表格所显示数据
        tableData: {
            type: Array,
            required: true
        },
        // 执行删除的回调函数
        handleDelete: {
            type: Function,
            required: true
        },
        // 执行编辑的回调函数
        handleEdit: {
            type: Function,
            required: true
        }
    },
    methods: {
        deleteRow(row) {
            this.handleDelete(row);
        },
        editRow(row){
            this.handleEdit(row);
        }
    }
}
</script>

<style scoped>

</style>