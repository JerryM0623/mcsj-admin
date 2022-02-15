<template>
    <div class="series">
        <el-card class="series-card">
            <!--功能区-->
            <el-row style="margin-bottom: 10px">
                <el-col :span="6">
                    <el-input v-model="searchInput" style="width: 100%" placeholder="请输入关键词进行搜索"></el-input>
                </el-col>
                <el-col :span="18">
                    <el-button @click="searchSeries" type="primary" style="margin-left: 10px">搜索</el-button>
                    <el-button @click="clearSearch" type="primary">清除搜索信息</el-button>
                    <el-button @click="addSeries" type="primary">添加新系列</el-button>
                </el-col>
            </el-row>
            <!--表格展示区-->
            <el-table
                class="series-table"
                :data="seriesData.showData"
                border
                stripe
                style="width: 100%"
            >
                <el-table-column
                    prop="id"
                    label="编号"
                    width="70"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="name"
                    label="系列名称"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="comment"
                    label="系列简介"
                    align="center"
                ></el-table-column>
                <el-table-column
                    label="操作"
                    width="150"
                    align="center"
                >
                    <template v-slot="scoped">
                        <el-button size="small" @click="editRow(scoped.row)" type="primary">编辑</el-button>
                        <el-button size="small" @click="deleteRow(scoped.row)" type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页组件区-->
            <el-pagination
                style="margin-top: 10px"
                background
                layout="prev, pager, next"
                :total="seriesData.total"
                @current-change="pageNumChange"
                :current-page.sync="paginationOptions.currentPage"
            >
            </el-pagination>
            <!--添加 / 编辑的 dialog 区-->
            <el-dialog
                :visible.sync="dialogData.isShow"
                :title="dialogTitle"
                width="35%"
                :show-close="false"
                :close-on-click-modal="false"
                :close-on-press-escape="false"
            >
                <el-form :model="dialogData" label-width="100">
                    <el-form-item label="系列名称" >
                        <el-input v-model="dialogData.seriesName" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="系列简介" >
                        <el-input type="textarea" v-model="dialogData.seriesComment" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="closeDialog">取 消</el-button>
                    <el-button type="primary" @click="submitDialog">确 定</el-button>
                </div>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
import seriesApis from "../../../../apis/goods.series.api";

export default {
    name: "Series",
    data() {
        return {
            searchInput: '',
            paginationOptions: {
                pageSize: 10,
                currentPage: 1,
            },
            seriesData: {
                originData: [],
                showData: [],
                total: 0
            },
            dialogData: {
                isShow: false,
                mode: 'pending',
                seriesName: '',
                seriesComment: '',
                seriesId: -1
            }
        }
    },
    methods: {
        /**
         * 分页获取数据信息
         * @param pageNum
         * @param pageSize
         * @returns {Promise<void>}
         */
        async getSeriesByPageNum(pageNum = 1, pageSize = this.paginationOptions.pageSize) {
            try {
                const { code, msg, data } = await this.$axios.get(seriesApis.getSeriesByPageNum, {
                    params:{
                        pageSize,
                        pageNum
                    }
                })
                if (code !== 200){
                    this.$message.error(msg);
                    return;
                }
                this.seriesData = {
                    originData: data.list,
                    showData: data.list,
                    total: data.total
                }
            }catch (e) {
                console.log(e);
                this.$message.error('获取数据失败');
            }
        },

        /**
         * 点击搜索按钮的事件处理函数
         */
        searchSeries() {
            const { searchInput, seriesData } = this;
            // 判断信息
            if (searchInput === '') {
                this.$message.error('请输入关键词');
                return;
            }
            // 开始搜索
            const newArr = [];
            seriesData.originData.forEach(item => {
                const checkID = item.id.toString().indexOf(searchInput);
                const checkName = item.name.toString().indexOf(searchInput);
                const checkComment = item.comment.toString().indexOf(searchInput);

                if (checkID >= 0 || checkName>= 0 || checkComment>= 0){
                    newArr.push(item);
                }
            })
            this.seriesData.showData = newArr;
        },

        /**
         * 清空搜索记录
         */
        clearSearch() {
            this.searchInput = '';
            this.seriesData.showData = this.seriesData.originData;
        },

        /**
         * 打开添加的 dialog
         */
        addSeries() {
            this.dialogData = {
                mode: 'create',
                seriesName: '',
                seriesComment: '',
                seriesId: -1,
                isShow: true
            }
        },

        /**
         * 添加一个新的系列
         */
        async addOne(){
            try {
                const { seriesName, seriesComment } = this.dialogData;
                const checkName = seriesName !== '';
                const checkComment = seriesComment !== '';

                if (!checkName || !checkComment){
                    this.$message.error('请填写数据');
                    return;
                }

                const { code, msg } = await this.$axios.post(seriesApis.addSeries, {
                    seriesName,
                    seriesComment
                })

                if (code !== 200){
                    this.$message.error(msg);
                    return;
                }

                this.$message.success(msg);
                await this.getSeriesByPageNum(this.paginationOptions.currentPage);
                this.dialogData = {
                    isShow: false,
                    mode: 'pending',
                    seriesName: '',
                    seriesComment: '',
                    seriesId: -1
                }

            }catch (e) {
                console.log(e);
                this.$message.error('操作失败！');
            }
        },

        /**
         * 打开编辑的 dialog
         */
        editRow(row) {
            this.dialogData = {
                mode: 'edit',
                seriesName: row.name,
                seriesComment: row.comment,
                seriesId: row.id,
                isShow: true
            }
        },

        async editOne(){
            try {
                const { seriesId, seriesName, seriesComment } = this.dialogData;
                const checkName = seriesName !== '';
                const checkComment = seriesComment !== '';
                const checkId = seriesId > 0;

                if (!checkName || !checkComment || !checkId){
                    this.$message.error('请填写数据');
                    return;
                }

                const { code, msg } = await this.$axios.post(seriesApis.editSeries, {
                    seriesName,
                    seriesComment,
                    seriesId
                })

                if (code !== 200){
                    this.$message.error(msg);
                    return;
                }

                this.$message.success(msg);
                await this.getSeriesByPageNum(this.paginationOptions.currentPage);
                this.dialogData = {
                    isShow: false,
                    mode: 'pending',
                    seriesName: '',
                    seriesComment: '',
                    seriesId: -1
                }

            }catch (e) {
                console.log(e);
                this.$message.error('操作失败！');
            }
        },

        /**
         * 点击提交时根据 mode 触发不同的请求完成 添加/编辑 功能
         */
        submitDialog(){
            const { mode } = this.dialogData;
            if (mode === 'pending'){
                this.$message.error('弹出框加载出现问题，请关闭重开');
                return;
            }
            const funcMap = {
                'create' : this.addOne,
                'edit' : this.editOne
            }

            funcMap[mode]();
        },

        /**
         * 关闭 dialog
         */
        closeDialog(){
            this.$confirm('你确定要关闭吗？关闭将会丢失全部的数据！', '注意', {
                cancelButtonText:'取消',
                confirmButtonText:'确定',
                type: 'warning'
            }).then(() => {
                this.dialogData = {
                    isShow: false,
                    mode: 'pending',
                    seriesName: '',
                    seriesComment: '',
                    seriesId: -1
                }
            })
        },
        deleteRow(row) {
            console.log('deleteRow', row);
        },
        pageNumChange(num) {
            console.log('pageNumChange', num);
        }
    },
    computed: {
        /**
         * 转换dialog的标题
         * @returns {*}
         */
        dialogTitle(){
            const titleMap = {
                'pending' : '初始化错误！',
                'edit' : '编辑系列',
                'create' : '添加系列'
            }
            return titleMap[this.dialogData.mode];
        }
    },
    mounted() {
        console.log('series show..');
        this.getSeriesByPageNum();
    }
}
</script>

<style scoped>

</style>