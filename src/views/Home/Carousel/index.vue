<template>
    <div class="carousel">
        <el-card class="management" style="margin-bottom: 20px">
            <el-row class="card-title">管理轮播图</el-row>
            <!--功能区-->
            <el-row style="margin-bottom: 10px">
                <el-col :span="6">
                    <el-input v-model="searchInput" style="width: 100%" placeholder="仅支持搜索编号和简介"></el-input>
                </el-col>
                <el-col :span="18">
                    <el-button @click="searchCarousel" type="primary" style="margin-left: 10px">搜索</el-button>
                    <el-button @click="clearSearch" type="primary">清除搜索信息</el-button>
                    <el-button @click="addCarousel" type="primary">上传轮播图</el-button>
                </el-col>
            </el-row>
            <!--数据展示区-->
            <carousel-table
                :change-carousel-status="changeCarouselStatus"
            ></carousel-table>
            <!--分页组件-->
            <el-pagination
                style="margin-top: 10px"
                background
                layout="prev, pager, next"
                :total="carouselList.total"
                @current-change="pageNumChange"
                :current-page.sync="paginationOptions.currentPage"
            >
            </el-pagination>
            <!--上传新的轮播图-->
            <add-carousel-dialog
                :dialog-form-visible="addCarouselDialogVisible"
                :handle-submit="dialogSubmit"
                :handle-cancel="dialogClose"
            ></add-carousel-dialog>
        </el-card>
        <el-card class="preview">
            <el-row class="card-title">预览轮播图</el-row>
            <el-carousel :interval="4000" type="card" height="350px">
                <el-carousel-item v-for="item in carouselList.onlineList" :key="item.id">
                    <el-image
                        style="width: 100%; height: 100%"
                        :src="item.imgUrl"
                        fit="fill"></el-image>
                </el-carousel-item>
            </el-carousel>
        </el-card>
    </div>
</template>

<script>
import CarouselTable from './components/CarouselTable';
import AddCarouselDialog from './components/AddCarouselDialog';
import { mapState } from 'vuex';

export default {
    name: "Carousel",
    components: {
        AddCarouselDialog,
        CarouselTable,
    },
    data() {
        return {
            searchInput: '',
            paginationOptions: {
                pageSize: 10,
                currentPage: 1
            },
            addCarouselDialogVisible: false,
        }
    },
    methods: {
        /**
         * @description 分页获取轮播图的数据并存入数据库中
         * @param pageNum
         * @param pageSize
         */
        async getCarouselByPageNum(pageNum = 1,
                                   pageSize = this.paginationOptions.pageSize){
            try {
                const { code, msg, data } = await this.$axios.get('/admin/carousel/page',{
                    params: {
                        pageNum,
                        pageSize
                    }
                })
                if (code !== 200){
                    this.$message.error(msg);
                    return;
                }
                // 更新 vuex 的数据
                await this.$store.dispatch('setCarouselData', data);
            }catch (e) {
                console.log(e);
                this.$message.error('数据获取失败');
            }
        },

        /**
         * @description 后台通信实现轮播图的上下线功能
         * @param row   当前操作行的数据
         * @param type  上线下线的标识符
         */
        async changeCarouselStatus(row, type){
            try {
                const { id } = row;
                const { code, msg } = await this.$axios.post('admin/carousel/setOnlineStatus', {
                    id,
                    status: type === 'offline' ? 0 : 1
                })
                this.$message({
                    type: code === 200 ? 'success' : 'error',
                    message: msg
                })
                if (code !== 200) return;
                // 更新数据
                await this.getCarouselByPageNum(this.paginationOptions.currentPage);
            }catch (e) {
                console.log(e);
                this.$message.error('操作失败!');
            }
        },

        /**
         * 搜索轮播图的回调函数
         */
        searchCarousel() {
            if (this.searchInput === ''){
                this.$message.error('请输入关键字进行搜索');
                return;
            }
            this.$store.dispatch('searchCarousel', this.searchInput);
        },

        /**
         * 清除搜索痕迹，恢复原样
         */
        clearSearch() {
            this.searchInput = '';
            this.$store.dispatch('clearSearchCarousel');
        },

        /**
         * 开启上传上传的dialog
         */
        addCarousel() {
            this.addCarouselDialogVisible = true;
        },

        /**
         * 关闭关闭上传的 dialog
         */
        dialogClose(){
            this.$confirm('你确定要关闭吗？关闭之后信息将会永久消失！','注意',{
                cancelButtonText:'取消',
                confirmButtonText:'确定',
                type: 'warning'
            }).then(() => {
                this.addCarouselDialogVisible = false;
            })
        },

        /**
         * 上传成功之后关闭 dialog
         */
        dialogSubmit(){
            this.addCarouselDialogVisible = false;
            this.getCarouselByPageNum(this.paginationOptions.currentPage);
        },

        /**
         * 指示器页面变化的时候进行通知后台进行数据获取
         * @param pageNum
         */
        pageNumChange(pageNum){
            this.getCarouselByPageNum(pageNum);
        }
    },
    computed: {
        ...mapState(["carouselList"])
    },
    watch: {},
    mounted() {
        this.getCarouselByPageNum();
    }
}
</script>

<style scoped>
.card-title {
    margin-bottom: 10px;
    font-size: 14px;
    color: #aaa;
}
</style>