const orderRouter = '/admin/order'

const orderApis = {
    // 分页获取全部
    getOrderByPage: `${ orderRouter }/page`,
    // 发货按钮
    orderDelivery: `${ orderRouter }/delivery`,
    // 同意退款
    agreeRefund: `${ orderRouter }/agree`,
    // 拒绝退款
    rejectRefund: `${ orderRouter }/reject`,
    // 获取订单信息
    getOrderLocation: `${ orderRouter }/location`,
    // 修改订单信息
    setOrderLocation: `${ orderRouter }/set/location`
}

export default orderApis;