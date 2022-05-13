<template>
  <div class="all-order">
    <el-card>
      <!--功能区-->
      <el-row style="margin-bottom: 10px">
        <el-col :span="6">
          <el-input v-model="searchInput" style="width: 100%" placeholder="请键入数据进行搜索"></el-input>
        </el-col>
        <el-col :span="18">
          <el-button @click="searchOrder" type="primary" style="margin-left: 10px">搜索</el-button>
          <el-button @click="clearSearch" type="primary">清除搜索信息</el-button>
        </el-col>
      </el-row>
      <AllOrderTable
        :table-data="showTableData"
      ></AllOrderTable>
    </el-card>
  </div>
</template>

<script>
import orderApis from '../../../../apis/order.api';
import AllOrderTable from '../components/AllOrderTable/index';
export default {
  name: "AllOrder",
  components: {
    AllOrderTable
  },
  data(){
    return {
      searchInput: '',
      tableData: [],
      showTableData: [],
      paginationOptions: {
        pageSize: 10,
        pageNum: 1,
        currentPage: 1
      },
      total: -1
    }
  },
  methods: {
    // 获取全部数据
    getOrderByPage(pageNum = this.paginationOptions.pageNum, pageSize = this.paginationOptions.pageSize){
      this.$axios.get(orderApis.getOrderByPage,{
        params: {
          pageNum,
          pageSize
        }
      })
      .then((res) => {
        if (res.code !== 200){
          this.$message.error(res.msg);
        }else{
          this.total = res.data.total;
          this.showTableData = this.tableData = res.data.list;
        }
      })
      .catch((err) => {
        console.log(err);
        this.$message.error('数据获取失败,请稍后重试')
      })
    },
    // 搜索订单
    searchOrder(){
      const result = this.tableData.filter(item => {
        if (item.productName.indexOf(this.searchInput) !== -1){
          return item;
        }
      })
      this.showTableData = result;
    },
    clearSearch(){
      this.searchInput = '';
      this.showTableData = this.tableData;
    }
  },
  mounted() {
    this.getOrderByPage();
  }
}
</script>

<style scoped>

</style>