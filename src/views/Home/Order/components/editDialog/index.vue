<template>
  <el-dialog
      class="edit-dialog"
      title="修改订单收货信息"
      :visible.sync="dialogVisible"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="35%"
  >
    <el-form>
      <el-form-item>
        收获人姓名：
        <el-input class="dialog-input" v-model="orderLocation.locationName"></el-input>
      </el-form-item>
      <el-form-item>
        收货人手机：
        <el-input class="dialog-input" v-model="orderLocation.locationPhone"></el-input>
      </el-form-item>
      <el-form-item>
        收货地址：
        <el-input class="dialog-input" v-model="orderLocation.location"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "editDialog",
  props:{
    // 控制显示与隐藏
    dialogVisible: {
      type: Boolean,
      required: true
    },
    // 收货信息
    orderLocation:{
      type: Object,
      require: true
    },
    // 取消按钮
    handleCancel: {
      type: Function,
      require: true
    },
    // 确认信息
    handleSubmit:{
      type: Function,
      require: true
    }
  },
  methods:{
    cancel(){
      this.handleCancel();
    },
    submit(){
      this.handleSubmit();
    }
  }
}
</script>

<style scoped>

</style>