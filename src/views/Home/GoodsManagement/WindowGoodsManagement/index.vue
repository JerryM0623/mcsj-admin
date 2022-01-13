<template>
    <div class="Window-goods-management">
        <!--        搜索-->
        <search-bar
            title="搜索商品"
            :options="searchBarOptions"
            :handler-search="filterSeries"
            :handler-clear="clearSearch"
        ></search-bar>
    </div>
</template>

<script>
import searchBar from '../../../../components/searchBar/index';

export default {
    name: "WindowGoodsManagement",
    components: {
        searchBar,
    },
    data(){
        return {
            // 搜索框的配置属性
            searchBarOptions: [
                {value: "id", label: "id", data: "id"},
                {value: "所属商品", label: "所属商品类型", data: "type_name"},
            ],
        }
    }
}
</script>

<style scoped>

</style>