<template>
  <div class="role-table">
    <el-table
        :data="tableData"
        stripe
        border
        highlight-current-row
        style="width: 100%">
      <el-table-column
          prop="orderId"
          label="编号"
          width="70"
          align="center">
      </el-table-column>
      <el-table-column
          prop="userName"
          label="下单用户"
          align="center">
      </el-table-column>
      <el-table-column
          prop="productName"
          label="下单商品"
          align="center">
      </el-table-column>
      <el-table-column
          prop="buyPrice"
          label="下单金额"
          align="center">
        <template slot-scope="scope"><span>￥{{ scope.row.buyPrice }}</span></template>
      </el-table-column>
      <el-table-column
          prop="buyNumber"
          label="下单数量"
          align="center">
      </el-table-column>
      <el-table-column
          prop="status"
          label="下单状态"
          align="center">
          <template slot-scope="scope">
            <span v-show="scope.row.status === 1" style="font-weight: 700; color: #e91515">未付款</span>
            <span v-show="scope.row.status === 2" style="font-weight: 700; color: #e91515">未发货</span>
            <span v-show="scope.row.status === 3" style="font-weight: 700; color: #45b0e3">已发货</span>
            <span v-show="scope.row.status === 4" style="font-weight: 700; color: #42b729">已签收</span>
            <span v-show="scope.row.status === 5" style="font-weight: 700; color: #e91515">申请退款</span>
            <span v-show="scope.row.status === 6" style="font-weight: 700; color: #42b729">退款成功</span>
            <span v-show="scope.row.status === 7" style="font-weight: 700; color: #e91515">退款失败</span>
          </template>
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="230"
          align="center">
        <template slot-scope="scope">
          <el-button v-show = "scope.row.status < 4" size="small" type="primary" @click="editRow(scope.row)">编辑</el-button>
          <el-button v-show = "scope.row.status === 2" size="small" type="warning" @click="delivery(scope.row)">发货</el-button>
          <el-button v-show = "scope.row.status === 5" size="small" type="success" @click="agreeRefund(scope.row)">同意退款</el-button>
          <el-button v-show = "scope.row.status === 5" size="small" type="danger" @click="rejectRefund(scope.row)">拒绝退款</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "AllTableOrder",
  props: {
    // 表格所显示数据
    tableData: {
      type: Array,
      required: true
    },
    // 点击编辑的回调函数
    handlerEdit:{
      type: Function,
      required: true
    },
    // 处理发货按钮你
    handlerDelivery:{
      type: Function,
      require: true
    },
    // 同意退款
    handlerAgreeRefund:{
      type: Function,
      require: true
    },
    // 拒绝退款
    handlerRejectRefund:{
      type: Function,
      require: true
    }
  },
  methods:{
    editRow(row){
      this.handlerEdit(row);
    },
    delivery(row){
      this.handlerDelivery(row);
    },
    agreeRefund(row){
      this.handlerAgreeRefund(row);
    },
    rejectRefund(row){
      this.handlerRejectRefund(row);
    }
  }
}
</script>

<style scoped>

</style>