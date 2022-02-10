<template>
        <el-table
            class="carousel-table"
            :data="carouselList.showList"
            border
            stripe
            style="width: 100%">
            <el-table-column
                prop="id"
                label="编号"
                width="70"
                align="center">
            </el-table-column>
            <el-table-column
                prop="uuid"
                label="唯一标识码"
                align="center">
            </el-table-column>
            <el-table-column
                prop="imgUrl"
                label="访问链接"
                align="center">
            </el-table-column>
            <el-table-column
                prop="imgAlt"
                label="简介"
                align="center">
            </el-table-column>
            <el-table-column
                prop="isOnline"
                label="是否上线"
                align="center"
            width="100">
                <template slot-scope="scope">
                    {{ scope.row.isOnline === 1 ? '上线中' : '已下线' }}
                </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="150"
                align="center">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.isOnline === 1" size="small" type="warning" @click="changeStatus(scope.row, 'offline')">下线</el-button>
                    <el-button v-else size="small" type="success" @click="changeStatus(scope.row, 'online')">上线</el-button>
                    <el-button size="small" type="danger" @click="deleteRow(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: "CarouselTable",
    props: {
        // 修改轮播图
        changeCarouselStatus: {
            type: Function,
            required: true
        }

    },
    computed: {
        ...mapState(['carouselList'])
    },
    methods: {
        /**
         * 分发事件，实现轮播图的上线与下线
         * @param row
         * @param type
         */
        changeStatus(row, type){
            this.changeCarouselStatus(row, type);
        }
    }
}
</script>

<style scoped>

</style>