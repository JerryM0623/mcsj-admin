<template>
    <div class="carousel-preview">
        <!--    实时展示-->
        <el-card style="box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);">
            <div class="tip-title">效果预览</div>
            <el-carousel type="card" class="carousel-preview" indicator-position="outside">
                <el-carousel-item v-for="item in carouselData" :key="item.id">
                    <el-image
                        :src="item.img_url"
                    ></el-image>
                </el-carousel-item>
            </el-carousel>
        </el-card>
    </div>
</template>

<script>
export default {
    name: "CarouselPreview",
    data(){
        return {
            carouselData: [], // 轮播图的数据
        }
    },
    methods:{
        /**
         * 获取全部缩略图数据，并且在表格中显示
         * @returns {Promise<void>}
         */
        async getAllCarousels() {
            try {
                // 发送请求
                const res = await this.$axios.get('/admin/carousel/all');

                // 失败操作
                if (res.code === 500) {
                    this.$message.error(res.msg);
                    return;
                }

                // 数据库无数据操作
                if (res.code === 300) {
                    this.$message.warning(res.msg);
                    return;
                }

                // 传递表格数据
                this.carouselData = res.data;
            } catch (e) {
                console.log(e)
            }
        },
    },
    mounted() {
        // 请求 数据库获取轮播图数据
        this.getAllCarousels();
    }
}
</script>

<style scoped>
.tip-title{
    font-size: 14px;
    color: #cecfd1;
    margin-bottom: 10px;
}
.carousel-preview{

}
</style>