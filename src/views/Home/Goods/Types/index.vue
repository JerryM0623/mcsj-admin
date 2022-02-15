<template>
    <div class="types">
        <el-card class="types-card">
            <!--功能区-->
            <el-row style="margin-bottom: 10px">
                <el-col :span="6">
                    <el-input v-model="searchInput" style="width: 100%" placeholder="请输入关键词进行搜索"></el-input>
                </el-col>
                <el-col :span="18">
                    <el-button @click="searchTypes" type="primary" style="margin-left: 10px">搜索</el-button>
                    <el-button @click="clearSearch" type="primary">清除搜索信息</el-button>
                    <el-button @click="addTypes" type="primary">添加新类型</el-button>
                </el-col>
            </el-row>
            <!--表格展示区-->
            <el-table
                class="series-table"
                :data="typesData.showData"
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
                    prop="seriesName"
                    label="所属系列"
                    align="center"
                    width="150"
                ></el-table-column>
                <el-table-column
                    prop="name"
                    label="类型名称"
                    align="center"
                    width="150"
                ></el-table-column>
                <el-table-column
                    prop="comment"
                    label="类型简介"
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
                :total="typesData.total"
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
                    <el-form-item label="所属系列">
                        <el-select v-model="dialogData.seriesId">
                            <el-option v-for="item in selectOptions" :value="item.id" :label="item.name"
                                       :key="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="类型名称">
                        <el-input v-model="dialogData.typeName"></el-input>
                    </el-form-item>
                    <el-form-item label="类型简介">
                        <el-input type="textarea" :rows="3" v-model="dialogData.typeComment"></el-input>
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
import typesApis from "../../../../apis/goods.types.api";
import seriesApis from "../../../../apis/goods.series.api";

export default {
    name: "Types",
    data() {
        return {
            searchInput: '',
            paginationOptions: {
                pageSize: 10,
                currentPage: 1,
            },
            typesData: {
                originData: [],
                showData: [],
                total: 0
            },
            dialogData: {
                isShow: false,
                mode: 'pending',
                seriesId: -1,
                typeName: '',
                typeComment: '',
                typeId: -1
            },
            selectOptions: [],
        }
    },
    methods: {
        /**
         * 分页获取数据信息
         * @param pageNum
         * @param pageSize
         * @returns {Promise<void>}
         */
        async getTypesByPageNum(pageNum = 1, pageSize = this.paginationOptions.pageSize) {
            try {
                const {code, msg, data} = await this.$axios.get(typesApis.getTypesByPageNum, {
                    params: {
                        pageSize,
                        pageNum
                    }
                })
                if (code !== 200) {
                    this.$message.error(msg);
                    return;
                }
                this.typesData = {
                    originData: data.list,
                    showData: data.list,
                    total: data.total
                }
            } catch (e) {
                console.log(e);
                this.$message.error('获取数据失败');
            }
        },

        /**
         * 点击搜索按钮的事件处理函数
         */
        searchTypes() {
            const {searchInput, typesData} = this;
            // 判断信息
            if (searchInput === '') {
                this.$message.error('请输入关键词');
                return;
            }
            // 开始搜索
            const newArr = [];
            typesData.originData.forEach(item => {
                const checkID = item.id.toString().indexOf(searchInput);
                const checkSeries = item.seriesName.toString().indexOf(searchInput);
                const checkName = item.name.toString().indexOf(searchInput);
                const checkComment = item.comment.toString().indexOf(searchInput);

                if (checkID >= 0 || checkSeries >= 0 || checkName >= 0 || checkComment >= 0) {
                    newArr.push(item);
                }
            })
            this.typesData.showData = newArr;
        },

        /**
         * 清空搜索记录
         */
        clearSearch() {
            this.searchInput = '';
            this.typesData.showData = this.typesData.originData;
        },

        /**
         * 打开添加的 dialog
         */
        async addTypes() {
            await this.getAllSeries();
            this.dialogData = {
                mode: 'create',
                seriesId: '',
                typeName: '',
                typeComment: '',
                typeId: -1,
                isShow: true
            }
        },

        /**
         * 获取全部系列数据
         */
        async getAllSeries() {
            try {
                const {code, msg, data} = await this.$axios.get(seriesApis.getAllSeries);

                if (code !== 200) {
                    this.$message.error(msg);
                    return;
                }

                this.selectOptions = data;
            } catch (e) {
                console.log(e);
                this.$message.error('获取下拉框数据失败');
            }
        },

        /**
         * 添加一个新的类型
         */
        async addOne() {
            try {
                const {seriesId, typeComment, typeName} = this.dialogData;
                const checkId = seriesId > 0;
                const checkComment = typeComment !== '';
                const checkName = typeName !== '';

                if (!checkId || !checkComment || !checkName) {
                    this.$message.error('请填写数据');
                    return;
                }

                const {code, msg} = await this.$axios.post(typesApis.addType, {
                    seriesId,
                    typeName,
                    typeComment
                })

                if (code !== 200) {
                    this.$message.error(msg);
                    return;
                }

                this.$message.success(msg);
                await this.getTypesByPageNum(this.paginationOptions.currentPage);
                this.dialogData = {
                    mode: 'pending',
                    seriesId: '',
                    typeName: '',
                    typeComment: '',
                    typeId: -1,
                    isShow: false
                }

            } catch (e) {
                console.log(e);
                this.$message.error('操作失败！');
            }
        },

        /**
         * 打开编辑的 dialog
         */
        async editRow(row) {
            await this.getAllSeries();
            let newSeriesId = -999;
            // 将 seriesName 转换成 seriesId
            for (let i = 0; i < this.selectOptions.length; i++) {
                if (this.selectOptions[i].name === row.seriesName) {
                    newSeriesId = this.selectOptions[i].id;
                    break;
                }
            }
            this.dialogData = {
                mode: 'edit',
                seriesId: newSeriesId,
                typeName: row.name,
                typeComment: row.comment,
                typeId: row.id,
                isShow: true
            }
        },

        /**
         * 编辑类型信息
         */
        async editOne() {
            try {
                const {typeId, seriesId, typeName, typeComment} = this.dialogData;

                const checkTypeId = typeId > 0;
                const checkId = seriesId > 0;
                const checkComment = typeComment !== '';
                const checkName = typeName !== '';
                if (!checkTypeId || !checkId || !checkComment || !checkName) {
                    this.$message.error('请填写数据');
                    return;
                }

                const {code, msg} = await this.$axios.post(typesApis.editType, {
                    typeId,
                    seriesId,
                    typeName,
                    typeComment
                })

                if (code !== 200) {
                    this.$message.error(msg);
                    return;
                }

                this.$message.success(msg);
                await this.getTypesByPageNum(this.paginationOptions.currentPage);
                this.dialogData = {
                    mode: 'pending',
                    seriesId: '',
                    typeName: '',
                    typeComment: '',
                    typeId: -1,
                    isShow: false
                }

            } catch (e) {
                console.log(e);
                this.$message.error('操作失败！');
            }
        },

        /**
         * 点击提交时根据 mode 触发不同的请求完成 添加/编辑 功能
         */
        submitDialog() {
            const {mode} = this.dialogData;
            if (mode === 'pending') {
                this.$message.error('弹出框加载出现问题，请关闭重开');
                return;
            }
            const funcMap = {
                'create': this.addOne,
                'edit': this.editOne
            }

            funcMap[mode]();
        },

        /**
         * 关闭 dialog
         */
        closeDialog() {
            this.$confirm('你确定要关闭吗？关闭将会丢失全部的数据！', '注意', {
                cancelButtonText: '取消',
                confirmButtonText: '确定',
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

        /**
         * 删除类型
         */
        deleteRow(row) {
            this.$confirm('你确定要删除吗？删除将会丢失全部的数据！', '注意', {
                cancelButtonText: '取消',
                confirmButtonText: '确定',
                type: 'warning'
            }).then(async () => {
                try {
                    const typeId = row.id;
                    const checkId = typeId > 0;

                    if (!checkId) {
                        this.$message.error('数据错误，不可进行删除操作！');
                        return;
                    }

                    const {code, msg} = await this.$axios.post(typesApis.deleteType, {typeId})

                    if (code !== 200) {
                        this.$message.error(msg);
                        return;
                    }

                    this.$message.success(msg);
                    await this.getTypesByPageNum(this.paginationOptions.currentPage);

                } catch (e) {
                    console.log(e);
                    this.$message.error('操作失败！');
                }
            })
        },

        /**
         * 分页器页面更新的时候回调函数
         */
        pageNumChange(num) {
            this.getSeriesByPageNum(num);
        }
    },
    computed: {
        /**
         * 转换dialog的标题
         * @returns {*}
         */
        dialogTitle() {
            const titleMap = {
                'pending': '初始化错误！',
                'edit': '编辑类型',
                'create': '添加类型'
            }
            return titleMap[this.dialogData.mode];
        }
    },
    mounted() {
        console.log('series show..');
        this.getTypesByPageNum();
    }
}
</script>