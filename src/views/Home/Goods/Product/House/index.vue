<template>
    <div class="window">
        <el-card>
            <!--功能区-->
            <el-row style="margin-bottom: 10px">
                <el-col :span="6">
                    <el-input v-model="searchInput" style="width: 100%" placeholder="请输入关键词进行搜索"></el-input>
                </el-col>
                <el-col :span="18">
                    <el-button @click="searchProduct" type="primary" style="margin-left: 10px">搜索</el-button>
                    <el-button @click="clearSearch" type="primary">清除搜索信息</el-button>
                    <el-button @click="addProduct" type="primary">添加新商品</el-button>
                </el-col>
            </el-row>
            <!--表格展示区-->
            <el-table
                :data="tableData.showData"
                border
                stripe
                style="width: 95%"
            >
                <el-table-column
                    prop="id"
                    label="编号"
                    width="70"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="typeName"
                    label="所属类型"
                    align="center"
                    width="100"
                ></el-table-column>
                <el-table-column
                    prop="name"
                    label="商品名称"
                    align="center"
                    width="200"
                ></el-table-column>
                <el-table-column
                    prop="originPrice"
                    label="初始价格"
                    align="center"
                    width="100"
                >
                    <template slot-scope="scoped">
                        <span>￥{{ scoped.row.originPrice }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="salePrice"
                    label="现售价格"
                    align="center"
                    width="100"
                >
                    <template slot-scope="scoped">
                        <span>￥{{ scoped.row.salePrice }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="preview"
                    label="预览图(点击查看大图)"
                    align="center"
                >
                    <template slot-scope="scoped">
                        <el-image
                            style="width: 100%; height: 100%; max-height: 150px"
                            :src="scoped.row.imgUrl"
                            :preview-src-list="previewList"
                            fit="fill"></el-image>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="isHot"
                    label="是否热门"
                    align="center"
                    width="120"
                >
                    <template slot-scope="scoped">
                        <span>{{ scoped.row.isHot === 1 ? '热门商品' : '非热门商品' }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="isOnline"
                    label="是否上架"
                    align="center"
                    width="120"
                >
                    <template slot-scope="scoped">
                        <span>{{ scoped.row.isOnline === 0 ? '未上架' : '已上架' }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="220"
                    align="center"
                >
                    <template v-slot="scoped">
                        <el-button size="small" @click="editRow(scoped.row)" type="primary">编辑</el-button>
                        <el-button v-if="scoped.row.isOnline === 0" size="small" @click="changeStatus('online',scoped.row)"
                                   type="success">上架
                        </el-button>
                        <el-button v-else size="small" @click="changeStatus('offline',scoped.row)" type="warning">下架</el-button>
                        <el-button size="small" @click="deleteRow(scoped.row)" type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页组件区-->
            <el-pagination
                style="margin-top: 10px"
                background
                layout="prev, pager, next"
                :total="tableData.total"
                @current-change="pageNumChange"
                :current-page.sync="paginationOptions.currentPage"
            >
            </el-pagination>
            <!--编辑/添加 dialog-->
            <el-dialog
                :title="dialogTitle"
                :visible.sync="dialogData.isShow"
                :show-close="false"
                :close-on-click-modal="false"
                :close-on-press-escape="false"
                width="500px"
            >
                <el-form label-width="100">
                    <el-form-item label="所属类型">
                        <el-select v-model="dialogData.typeId">
                            <el-option v-for="item in typeList" :key="item.id" :value="item.id" :label="item.name"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="商品名称">
                        <el-input v-model="dialogData.name"></el-input>
                    </el-form-item>

                    <el-form-item label="商品图片">
                        <el-upload
                            class="upload-demo"
                            ref="upload"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :auto-upload="false"
                            :file-list="fileList"
                            :on-change="fileStatusChanged"
                            :limit="1"
                            list-type="picture">
                            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        </el-upload>
                    </el-form-item>

                    <!--<el-form-item label="上传商品图片">-->
                    <!--    <input style="background-color: #409eff; width: 100px; height: 50px" type="file" name="file" value="点击选择文件">-->
                    <!--</el-form-item>-->

                    <el-form-item v-if="dialogData.dialogMode === 'edit'" label="商品图片预览">
                        <el-image style="height: 200px" :src="dialogData.imgUrl" fit="fill"></el-image>
                    </el-form-item>

                    <el-form-item label="简介一">
                        <el-input type="textarea" :rows="5" v-model="dialogData.commentOne"></el-input>
                    </el-form-item>

                    <el-form-item label="简介二">
                        <el-input type="textarea" :rows="5" v-model="dialogData.commentTwo"></el-input>
                    </el-form-item>

                    <el-form-item label="简介三">
                        <el-input type="textarea" :rows="5" v-model="dialogData.commentThree"></el-input>
                    </el-form-item>

                    <el-form-item label="原始价格">
                        <el-input v-model="dialogData.originPrice">
                            <template slot="prepend">￥</template>
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="现售价格">
                        <el-input v-model="dialogData.salePrice">
                            <template slot="prepend">￥</template>
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="是否热门">
                        <el-select v-model="dialogData.isHot">
                            <el-option label="非热门商品" value="0"></el-option>
                            <el-option label="热门商品" value="1"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="是否上架">
                        <el-select v-model="dialogData.isOnline">
                            <el-option label="不上架" value="0"></el-option>
                            <el-option label="上架" value="1"></el-option>
                        </el-select>
                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="closeDialog">取 消</el-button>
                    <el-button type="primary" @click="dialogSubmit">确 定</el-button>
                </div>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
import productApis from "../../../../../apis/goods.product.api";
import typesApis from "../../../../../apis/goods.types.api";

export default {
    name: "House",
    data() {
        return {
            searchInput: '',
            tableData: {
                showData: [],
                originData: [],
                total: 0
            },
            previewList: [],
            paginationOptions: {
                currentPage: 1,
                pageSize: 10
            },
            dialogData: {
                isShow: false,
                dialogMode: 'pending'
            },
            fileList: [],
            typeList: [],
        }
    },
    methods: {
        /**
         * 分页获取窗户的数据
         * @param pageNum
         * @param pageSize
         * @returns {Promise<void>}
         */
        async getHouseByPageNum(pageNum = 1, pageSize = this.paginationOptions.pageSize) {
            try {
                const {code, msg, data} = await this.$axios.get(productApis.getHouseByPageNum, {
                    params: {
                        pageNum,
                        pageSize
                    }
                })
                if (code !== 200) {
                    this.$message.error(msg);
                    return;
                }
                this.tableData = {
                    showData: data.list,
                    originData: data.list,
                    total: data.total
                }
                data.list.forEach(item => {
                    this.previewList.push(item.imgUrl);
                })
            } catch (e) {
                console.log(e);
                this.$message.error('操作失败');
            }
        },

        /**
         * 请求 window 的 type
         */
        async getHouseTypes(){
            try {
                const { code, msg, data } = await this.$axios.get(typesApis.getTypesBySeries, {
                    params: {
                        seriesId: 1
                    }
                })
                if (code !== 200){
                    console.log(msg);
                    return;
                }
                this.typeList = data;
            }catch (e) {
                console.log(e);
            }
        },

        /**
         * 搜索
         */
        searchProduct(){
            const key = this.searchInput;
            const list = this.tableData.originData;
            let newArr = [];

            list.forEach(item => {
                if (item.id.toString().indexOf(key) >= 0 || item.typeName.toString().indexOf(key) >= 0 || item.name.toString().indexOf(key) >= 0){
                    newArr.push(item);
                }
            })
            this.tableData.showData = newArr;
        },

        /**
         * 清空搜索
         */
        clearSearch(){
            this.searchInput = '';
            this.tableData.showData = this.tableData.originData;
        },

        /**
         * 切换商品的上下架
         */
        async changeStatus(type, row){
            try {
                const { code, msg } = await this.$axios.post(productApis.changeStatusWindow, {
                    status: type === 'online' ? 1 : 0,
                    id: row.id
                })
                if (code !== 200){
                    this.$message.error(msg);
                    return;
                }

                this.$message.success(msg);
                await this.getWindowByPageNum(this.paginationOptions.currentPage);
            }catch (e) {
                console.log(e);
                this.$message.error('操作失败');
            }
        },

        /**
         * 删除商品
         */
        deleteRow(row){
            this.$confirm('你确定要删除吗？删除之后信息将会永久消失！','注意',{
                cancelButtonText:'取消',
                confirmButtonText:'确定',
                type: 'warning'
            }).then( async () => {
                try {
                    const { id } = row;
                    const { code, msg } = await this.$axios.post(productApis.deleteOneWindow, {id});
                    this.$message({
                        type: code === 200 ? 'success' : 'error',
                        message: msg
                    })
                    if (code !== 200) return;
                    await this.getWindowByPageNum(this.paginationOptions.currentPage);
                }catch (e) {
                    console.log(e);
                    this.$message.error('请求失败');
                }
            })
        },

        /**
         * 获取 typeId
         */
        typeId(typeName){
            for (let i = 0; i < this.typeList.length; i++){
                if (this.typeList[i].name === typeName){
                    return this.typeList[i].id;
                }
            }
        },

        /**
         * 开启 create 模式 dialog
         */
        async addProduct(){
            // 请求数据
            await this.getWindowTypes();
            // 配置dialog
            this.dialogData = {
                typeId: '',
                name: '',
                commentOne: '',
                commentTwo: '',
                commentThree: '',
                originPrice: '',
                salePrice: '',
                isHot: '',
                isOnline: '',
                dialogMode: 'create',
                isShow: true
            }
        },

        /**
         * 开启 edit 模式 dialog
         */
        async editRow(row){
            // 请求数据
            await this.getWindowTypes();
            // 配置 dialog
            this.dialogData = {
                id: row.id,
                typeId: this.typeId(row.typeName), // 实现点击编辑的时候就自动选中下拉列表中对应的数据
                name: row.name,
                imgUrl: row.imgUrl,
                commentOne: row.commentOne,
                commentTwo: row.commentTwo,
                commentThree: row.commentThree,
                originPrice: row.originPrice,
                salePrice: row.salePrice,
                isHot: row.isHot.toString(),
                isOnline: row.isOnline.toString(),
                dialogMode: 'edit',
                isShow: true
            }
        },

        /**
         * 关闭任意模式的 dialog 使其成为 pending 模式并清空数据
         */
        closeDialog(){
            this.$confirm('你确定要关闭吗？关闭将会丢失全部的数据！','注意',{
                cancelButtonText:'取消',
                confirmButtonText:'确定',
                type: 'warning'
            }).then(() => {
                this.dialogData = {
                    dialogMode: 'pending',
                    isShow: false
                }
            })
        },

        /**
         * 文件选中之后 更新 fileList
         */
        fileStatusChanged(file,fileList){
            this.fileList = fileList;
            console.log(fileList);
        },

        /**
         * 点击 dialog 右下角的确认按钮的回调函数
         */
        async dialogSubmit(){
            if (this.dialogData.dialogMode === 'pending') {
                this.$message.error('系统出现错误，请刷新页面重试！');
                return;
            }

            try {
                const { dialogMode, typeId, name,
                    commentOne, commentTwo, commentThree,
                    isHot, isOnline, originPrice, salePrice } = this.dialogData;
                const formData = new FormData();

                formData.append('typeId', typeId);
                formData.append('seriesId', 1);     // 1 代表窗系列
                formData.append('name', name);
                formData.append('commentOne', commentOne);
                formData.append('commentTwo', commentTwo);
                formData.append('commentThree', commentThree);
                formData.append('isHot', isHot);
                formData.append('isOnline', isOnline);
                formData.append('originPrice', originPrice);
                formData.append('salePrice', salePrice);

                if (this.dialogData.dialogMode === 'edit'){
                    formData.append('id', this.dialogData.id);
                }

                // 如果存在图片上传就携带图片进行上传
                if (this.fileList.length > 0){
                    formData.append('file', this.fileList[0].raw);
                }

                // 上传 formData 必须使用 multipart/form-data 为头
                const { code, msg } = await this.$axios.post(dialogMode === 'create' ?
                    productApis.addOneWindow : productApis.editOneWindow, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                if (code !== 200){
                    this.$message.error(msg);
                    return;
                }
                this.$message.success(msg);
                // 清空数据
                this.dialogData = {
                    dialogMode: 'pending',
                    isShow: false
                }
                this.fileList = [];
                await this.getWindowByPageNum(this.paginationOptions.currentPage);
            }catch (e) {
                console.log(e);
            }

        },

        /**
         * 自定义的 upload 上传函数
         */
        async submitForm(){

        },

        /**
         * 分页组件更新页面的时候触发的回调函数
         * 用于触发获取数据的函数进行数据更新
         * @param num
         */
        pageNumChange(num) {
            this.searchInput = '';
            this.getWindowByPageNum(num);
        }
    },
    computed: {
        dialogTitle(){
            const titleMap = new Map();
            titleMap.set('pending', '初始化...');
            titleMap.set('create', '添加一个新的商品');
            titleMap.set('edit', '编辑商品数据');
            return titleMap.get(this.dialogData.dialogMode);
        },
    },
    mounted() {
        this.getHouseByPageNum();
    }
}
</script>

<style scoped>
</style>