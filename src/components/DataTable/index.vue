<template>
    <el-card shadow="never">
        <el-button @click="openDialog" type="primary" style="margin-bottom: 20px;">添加数据</el-button>
        <!--    数据-->
        <el-table
            :data="dataList"
            border
            class="data-table"
        >
            <el-table-column
                v-for="item in columnList"
                :key="item.label"
                v-bind="item"
            >
            </el-table-column>
            <el-table-column
                label="操作"
                width="150"
                align="center"
            >
                <template v-slot:default="scoped">
                    <el-button @click="editRow(scoped)" type="primary" size="small">编辑</el-button>
                    <el-button @click="deleteRow(scoped)" type="danger" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            class="data-table-pagination"
            v-bind="paginationOptions"
            @current-change="currentChange"
        ></el-pagination>
    </el-card>
</template>

<script>
export default {
    name: "DataTable",
    props: {
        // 用于显示的数组
        dataList: {
            type: Array,
            required: true
        },
        /*
        * 控制表格列表的数组（最后一列编辑不在这边传入）,类型如下
        * [{ prop:"id", label:"编号", width:"80", align:"center" },
        * { prop:"type_name", label:"所属商品类型", align:"center" }, ...]
        */
        columnList: {
            type: Array,
            required: true
        },
        // 分页的配置
        paginationOptions:{
            type: Object,
            required :true
        },
        // 处理编辑任务
        handleEdit: {
            type: Function,
            required: true
        },
        // 处理删除任务
        handleDelete: {
            type: Function,
            required: true
        },
        // 开启添加系列的dialog
        handleAdd: {
            type: Function,
            required: true
        },
        // 分页改变的回调函数
        handleCurrentChange:{
            type: Function,
            required: true
        }
        // 控制表格的高度
        // height: {
        //     type: String,
        //     default: () => "375"
        // }
    },
    methods: {
        /**
         * 编辑
         * @param scoped
         */
        editRow(scoped) {
            this.handleEdit({mode:'edit',data:scoped.row});
        },
        /**
         * 删除
         * @param scoped
         */
        deleteRow(scoped) {
            this.handleDelete(scoped.row);
        },
        /**
         * 添加
         */
        openDialog() {
            this.handleAdd();
        },
        /**
         * 分页指示器的当前分页改变的时候触发
         */
        currentChange(pageNum){
            // 调用父组件进行数据请求
            this.handleCurrentChange(pageNum);
        }
    }
}
</script>

<style scoped>
.data-table-pagination{
    margin-top: 20px;
}
</style>