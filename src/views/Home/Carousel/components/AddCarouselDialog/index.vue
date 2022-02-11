<template>
    <div class="add-carousel-dialog">
        <el-dialog
            title="上传轮播图"
            :visible.sync="dialogFormVisible"
            width="35%"
            :show-close="false"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
        >
            <el-form>
                <el-form-item label="简介">
                    <el-input type="text" v-model="imgAlt"></el-input>
                </el-form-item>
                <el-form-item label="是否上线">
                    <el-select v-model="isOnline">
                        <el-option label="上线" value="1"></el-option>
                        <el-option label="不上线" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <!--图片-->
                <el-form-item label="图片" label-width="100">
                    <el-upload
                        class="upload-carousel"
                        ref="upload"
                        action="http://127.0.0.1:4000/admin/carousel/upload"
                        :file-list="fileList"
                        :auto-upload="false"
                        :http-request="submit"
                    >
                        <el-button slot="trigger" size="middle" type="primary">选取文件</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogCancel">取 消</el-button>
                <el-button type="primary" @click="$refs.upload.submit()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "addCarouselDialog",
    props: {
        dialogFormVisible: {
            type: Boolean,
            required: true
        },
        handleCancel: {
            type: Function,
            required: true
        },
        handleSubmit: {
            type: Function,
            required: true
        }
    },
    data() {
        return {
            fileList: [],       // 上传文件列表
            imgAlt: '',         // 图片简介
            isOnline: ''        // 是否上线
        }
    },
    methods: {
        dialogCancel(){
            this.fileList = [];
            this.imgAlt = '';
            this.isOnline = '';
            this.handleCancel();
        },
        /**
         * 覆盖原来的默认上传方式的函数
         * @returns {Promise<void>}
         */
        async submit(){
            try {
                const formData = new FormData();
                formData.append('imgAlt', this.imgAlt);
                formData.append('isOnline', this.isOnline);
                formData.append('file', arguments[0].file);

                // 上传 formData 必须使用 multipart/form-data 为头
                const { code, msg } = await this.$axios.post('/admin/carousel/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })

                if (code !== 200){
                    this.$message.error(msg);
                    return;
                }
                this.$message.success(msg);
                this.fileList = [];
                this.isOnline = '';
                this.imgAlt = '';
                this.handleSubmit();
            }catch (e) {
                console.log(e);
            }
        }
    },
}
</script>

<style scoped>

</style>