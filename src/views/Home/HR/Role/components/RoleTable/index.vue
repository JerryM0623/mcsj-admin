<template>
    <div class="role-table">
        <el-table
            :data="tableData"
            stripe
            border
            highlight-current-row
            style="width: 100%">
            <el-table-column
                prop="rolePermissionID"
                label="编号"
                width="70"
                align="center">
            </el-table-column>
            <el-table-column
                prop="roleName"
                label="职位名称"
                align="center">
            </el-table-column>
            <el-table-column
                prop="Permission"
                label="拥有的权限"
                align="center">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="100"
                align="center">
                <template slot-scope="scope">
                    <el-button size="small" type="danger" @click="deleteRow(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: "RoleTable",
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
    },
    methods: {
        deleteRow(row) {
            this.handleDelete(row);
        }
    }
}
</script>

<style scoped>

</style>