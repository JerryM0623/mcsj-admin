<template>
    <div class="carousel-container">
        <!--    添加-->
        <el-dialog title="添加轮播图" :visible.sync="dialogFormVisible">
            <el-form :model="addCarousel">
                <el-form-item label="选择文件">
                    <el-upload
                        class="upload-carousel"
                        ref="uploadCarousel"
                        action="http://127.0.0.1:4000/admin/carousel/add"
                        :file-list="addCarousel.fileList"
                        :auto-upload="false"
                        :http-request="mySubmitCarousel"
                    >
                        <el-button @click="addCarousel.fileList = [];" slot="trigger" type="primary"
                                   style="margin-right: 10px">点击选择
                        </el-button>
                        <span>每次只能上传一张图片哦！</span>
                    </el-upload>
                </el-form-item>
                <el-form-item label="轮播图简介">
                    <el-input type="textarea" :rows="4" placeholder="请输入内容" style="width: 50%"
                              v-model="addCarousel.imgAlt"></el-input>
                </el-form-item>
                <el-form-item label="是否上线">
                    <el-select v-model="addCarousel.isOnline">
                        <el-option value="不上线">不上线</el-option>
                        <el-option value="上线">上线</el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">取 消</el-button>
                <el-button type="primary" @click="$refs.uploadCarousel.submit();">添 加</el-button>
            </div>
        </el-dialog>
        <!--    数据显示-->
        <el-card style="box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);margin-bottom: 20px;">
            <el-button type="primary" style="margin-bottom: 20px;" @click="dialogFormVisible = true">添加轮播图</el-button>
            <!--    数据-->
            <el-table
                v-loading="loading"
                :data="carouselData"
                border
                height="475"
                style="width: 100%;">
                <el-table-column
                    prop="id"
                    label="轮播图编号"
                    width="120"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="img_url"
                    label="轮播图缩略图"
                    align="center"
                    width="120"
                >
                    <template slot-scope="scope">
                        <el-image
                            style="width: 96px; height: 54px"
                            :src="scope.row.img_url"
                            :preview-src-list="srcList"
                        >
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="img_alt"
                    label="轮播图说明"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="is_online"
                    label="是否上线"
                    align="center"
                    width="80"
                >
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="150"
                    align="center"
                >
                    <template v-slot:default="scoped">
                        <el-button @click="openDrawer(scoped)" type="primary" size="small">编辑</el-button>
                        <el-button @click="deleteCarousel(scoped)" type="danger" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <!--    编辑数据-->
        <el-drawer
            title="编辑轮播图"
            direction="ltr"
            custom-class="edit-carousel-drawer"
            ref="editCarouselDrawer"
            :visible.sync="isDrawerShow"
            :wrapperClosable="false"
            :show-close="false"
        >
            <div class="edit-carousel-drawer__content">
                <el-form class="edit-form" label-width="100px" :model="editCarousel">
                    <el-form-item label="轮播图简介">
                        <el-input style="width: 80%" v-model="editCarousel.img_alt"></el-input>
                    </el-form-item>
                    <el-form-item label-width="100px" label="是否上线">
                        <el-select v-model=editCarousel.is_online>
                            <el-option value="已上线">已上线</el-option>
                            <el-option value="未上线">未上线</el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div class="edit-carousel-drawer__footer">
                    <el-button @click="closeDrawer" class="edit-button">取 消</el-button>
                    <el-button @click="submitEdit()" class="edit-button" type="primary">提 交</el-button>
                </div>
            </div>
        </el-drawer>

    </div>
</template>

<script>
import checkAddCarousel from "../../../../utils/checkAddCarousel";

export default {
    name: "CarouselManagement",
    data() {
        return {
            loading: false,   // 控制表格的加载层出现与消失
            carouselData: [], // 轮播图的数据
            srcList: [],      // 缩略图的可点击列表
            dialogFormVisible: false,   // 控制对话框的显示与隐藏
            addCarousel: {              // 对话框中form的数据
                fileList: [],              // upload 组件需要的数据
                imgAlt: '',                // 轮播图的简介描述
                isOnline: '上线',          // 轮播图是否上线，默认为上线
            },
            formLabelWidth: '120px',    // 对话框中form的label宽度
            isDrawerShow: false,         // 抽屉的显示与隐藏
            editCarousel: {
                img_alt: '',
                is_online: '',
                img_uuid: ''
            },            // 编辑轮播图的数据

        }
    },
    methods: {
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

                // 传递可点击列表的数据
                let srcDataList = [];
                for (let i = 0; i < res.data.length; i++) {
                    srcDataList[i] = res.data[i].img_url;
                }

                // 传递缩略图列表数据
                this.srcList = srcDataList;
            } catch (e) {
                console.log(e)
            }
        },

        /**
         * 未做出提交行为的情况下主动关闭 dialog 触发的函数
         */
        closeDialog() {
            // 弹框确认
            this.$confirm('即将退出编辑，将会丢失已经改动的部分，是否继续?', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 清除数据
                this.addCarousel.fileList = [];
                this.addCarousel.imgAlt = '';
                this.addCarousel.isOnline = '上线';
                // 关闭dialog
                this.dialogFormVisible = false
            })
        },

        /**
         * 覆盖 el-upload 提交行为的方法，由 dialog 中的提交按钮触发
         */
        async mySubmitCarousel() {
            try {
                // 创建 formData
                const formData = new FormData();
                formData.append('img_alt', this.addCarousel.imgAlt);
                formData.append('is_online', this.addCarousel.isOnline);
                formData.append('file', arguments[0].file);

                // 使用 axios 发送请求
                const res = await this.$axios.post('/admin/carousel/add', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })

                if (res.code === 200){
                    // 上传成功
                    this.$message.success(res.msg);
                    // 关闭dialog
                    // 清除数据
                    this.addCarousel.fileList = [];
                    this.addCarousel.imgAlt = '';
                    this.addCarousel.isOnline = '上线';
                    // 关闭dialog
                    this.dialogFormVisible = false
                    // 刷新数据
                    await this.getAllCarousels();
                }else {
                    // 上传失败
                    this.$message.error(res.msg)
                }

            }catch (e) {
                console.log(e)
            }
        },

        /**
         * 开启 Drawer
         */
        openDrawer(scoped) {
            let {img_uuid, img_alt, is_online} = scoped.row;
            // 更新数据
            this.editCarousel.img_alt = img_alt;
            this.editCarousel.is_online = is_online;
            this.editCarousel.img_uuid = img_uuid;
            // 开启抽屉
            this.isDrawerShow = true;
        },

        /**
         * 关闭 Drawer
         */
        closeDrawer() {
            // 弹框确认
            this.$confirm('即将退出编辑，将会丢失已经改动的部分，是否继续?', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 清除数据
                this.editCarousel.img_alt = '';
                this.editCarousel.is_online = '';
                // 关闭dialog
                this.isDrawerShow = false;
            })

        },

        /**
         * 打开抽屉编辑之后提交编辑之后的信息到服务器
         * @returns {Promise<void>}
         */
        async submitEdit() {
            const res1 = await checkAddCarousel.isAltInput(this.editCarousel.img_alt, this);
            const res2 = await checkAddCarousel.isAltInput(this.editCarousel.is_online, this);

            if (res1 && res2) {
                // 发送请求
                const res3 = await this.$axios.post('/admin/carousel/update', {
                    img_uuid: this.editCarousel.img_uuid,
                    img_alt: this.editCarousel.img_alt,
                    is_online: this.editCarousel.is_online === '已上线' ? 1 : 0
                })
                if (res3.code === 200) {
                    this.$message.success(res3.msg)
                }
                if (res3.code === 500) {
                    this.$message.error(res3.msg)
                }

                // 关闭drawer
                this.isDrawerShow = false;

                // 更新数据
                await this.getAllCarousels();
            }
        },

        deleteCarousel(scoped){
            // 弹出信息框防止误点
            this.$confirm('即将删除该轮播图的所有信息数据，高操作无法撤回，是否继续?', '注意', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                const { img_uuid } = scoped.row;
                // 请求
                const res = await this.$axios.post('/admin/carousel/delete',{img_uuid});
                if(res){
                    this.$message.success(res.msg)
                    await this.getAllCarousels();
                }else {
                    this.$message.error(res.msg)
                }
            })
        }
    },
    mounted() {
        // 获取全部数据
        this.getAllCarousels();
    }
}
</script>

<style scoped>
.edit-form {
    padding: 0 20px;
}

.edit-carousel-drawer__content {
    position: relative;
    height: 100%;
}

.edit-carousel-drawer__footer {
    position: absolute;
    bottom: 20px;
    right: 20px;
}

.edit-button {
    width: 200px;
}
</style>