const orderRouter = '/admin/order'

const orderApis = {
    // 获取全部
    getOrderByPage: `${ orderRouter }/page`,
    getRefundOrder: `${ orderRouter }/refund`
}

export default orderApis;