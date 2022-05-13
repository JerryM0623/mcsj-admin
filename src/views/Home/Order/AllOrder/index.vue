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
      <!--表格区域-->
      <AllOrderTable
        :table-data="showTableData"
        :handler-edit="dialogShow"
        :handler-delivery="productDelivery"
        :handler-agree-refund="agreeRefund"
        :handler-reject-refund="rejectRefund"
      ></AllOrderTable>
    <!--  分页区域-->
      <el-pagination
          style="margin-top: 10px"
          background
          layout="prev, pager, next"
          :total="total"
          @current-change="pageNumChange"
          :current-page.sync="paginationOptions.currentPage"
      >
      </el-pagination>
    <!--  弹出框-->
      <EditDialog
        :dialog-visible="editDialogShow"
        :order-location="orderLocation"
        :handle-cancel="closeDialog"
        :handle-submit="submitDialog"
      ></EditDialog>
    </el-card>
  </div>
</template>

<script>
import orderApis from '../../../../apis/order.api';
import AllOrderTable from '../components/AllOrderTable/index';
import EditDialog from '../components/editDialog/index';
export default {
  name: "AllOrder",
  components: {
    AllOrderTable,
    EditDialog,
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
      total: -1,
      editDialogShow: false,
      orderLocation: {},
      orderId: -1,
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
    },
    /**
     * 分页组件换页时的事件回调
     * @param pageNum
     */
    pageNumChange(pageNum) {
      this.getOrderByPage(pageNum);
    },
    dialogShow(row){
      // 获取订单信息
      const orderId = row.orderId;
      this.orderId = orderId;
      this.$axios.get(orderApis.getOrderLocation, {
        params: {
          orderId
        }
      })
      .then((res) => {
        if(res.code !== 200){
          this.$message.error(res.msg)
        }else {
          this.orderLocation = res.data;
          this.editDialogShow = true;
        }
      })
      .catch(() => {
        this.$message.error('暂时无法获取收货信息')
      })
    },
    closeDialog(){
      this.$confirm('你确定要取消修改？已修改内容将会消失','注意',{
        cancelButtonText:'取消',
        confirmButtonText:'确定',
        type: 'warning'
      }).then(async () => {
        this.editDialogShow = false;
        this.orderLocation = {};
        this.orderId = -1;
      })
    },
    submitDialog(){
      this.$axios.post(orderApis.setOrderLocation, {
        orderId: this.orderId,
        locationName: this.orderLocation.locationName,
        locationPhone: this.orderLocation.locationPhone,
        location: this.orderLocation.location
      })
      .then((res) => {
        if (res.code!==200){
          this.$message.error(res.msg);
        }else{
          this.$message.success(res.msg);
          this.editDialogShow = false;
          this.orderLocation = {};
          this.orderId = -1;
        }
      })
      .catch(() => {
        this.$message.error('系统错误，暂时无法修改！')
      })
    },
    // 发货
    productDelivery(row){
      const orderId = row.orderId;
      this.$axios.post(orderApis.orderDelivery, {
        orderId
      })
      .then((res) => {
        if (res.code !== 200){
          this.$message.error(res.msg);
        }else{
          this.$message.success(res.msg);
          this.getOrderByPage(this.paginationOptions.currentPage, this.paginationOptions.pageSize);
        }
      })
      .catch(() => {
        this.$message.error('发货失败');
      })
    },
    agreeRefund(row){
      const orderId = row.orderId;
      this.$axios.post(orderApis.agreeRefund, {
        orderId
      })
      .then((res) => {
        if (res.code !== 200){
          this.$message.error(res.msg);
        }else{
          this.$message.success(res.msg);
          this.getOrderByPage(this.paginationOptions.currentPage, this.paginationOptions.pageSize);
        }
      })
      .catch(() => {
        this.$message.error('操作失败');
      })
    },
    rejectRefund(row){
      const orderId = row.orderId;
      this.$axios.post(orderApis.rejectRefund, {
        orderId
      })
          .then((res) => {
            if (res.code !== 200){
              this.$message.error(res.msg);
            }else{
              this.$message.success(res.msg);
              this.getOrderByPage(this.paginationOptions.currentPage, this.paginationOptions.pageSize);
            }
          })
          .catch(() => {
            this.$message.error('操作失败');
          })
    }
  },
  mounted() {
    this.getOrderByPage();
  }
}
</script>

<style scoped>

</style>