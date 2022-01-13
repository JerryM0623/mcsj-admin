<template>
    <el-card style="box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);margin-bottom: 20px;">
        <el-button @click="openDialog" type="primary" style="margin-bottom: 20px;">添加系列</el-button>
        <!--    数据-->
        <el-table
            :data="dataList"
            border
            style="width: 100%;"
            height="375"
        >
            <el-table-column
                v-for="item in columnList"
                :key="item.label"
                :prop="item.prop"
                :label="item.label"
                :width="item.width ? item.width : ''"
                :align="item.align ? item.align : 'center'"
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
    </el-card>
</template>

<script>
export default {
    name: "DataTable",
    props:{
        // 用于显示的数组
        dataList:{
            type: Array,
            required: true
        },
        /*
        * 控制表格列表的数组（最后一列编辑不在这边传入）,类型如下
        * [{ prop:"id", label:"编号", width:"80", align:"center" },
        * { prop:"type_name", label:"所属商品类型", align:"center" }, ...]
        */
        columnList:{
            type: Array,
            required: true
        },
        // 处理编辑任务
        handleEdit:{
            type:Function,
            required:true
        },
        // 处理删除任务
        handleDelete:{
            type:Function,
            required:true
        },
        // 开启添加系列的dialog
        handleOpenDialog:{
            type:Function,
            required:true
        }
    },
    methods:{
        editRow(scoped){
            this.handleEdit(scoped.row);
        },
        deleteRow(scoped){
            this.handleDelete(scoped.row);
        },
        openDialog(){
            this.handleOpenDialog();
        }
    }
}
</script>

<style scoped>

</style>