const productRoute = '/admin/goods/product';

const productApis = {
    // 分页获取数据
    getWindowByPageNum: `${ productRoute }/window/getByPage`,
    getDoorByPageNum: `${ productRoute }/door/getByPage`,
    getHouseByPageNum: `${ productRoute }/house/getByPage`,

    // 添加一个商品
    addOneWindow: `${ productRoute }/window/add`,
    addOneDoor: `${ productRoute }/door/add`,
    addOneHouse: `${ productRoute }/house/add`,

    // 编辑一个商品
    editOneWindow: `${ productRoute }/window/edit`,
    editOneDoor: `${ productRoute }/door/edit`,
    editOneHouse: `${ productRoute }/house/edit`,

    // 下线一个商品
    offlineOneWindow: `${ productRoute }/window/offline`,
    offlineOneDoor: `${ productRoute }/door/offline`,
    offlineOneHouse: `${ productRoute }/house/offline`,

    // 删除一个商品
    deleteOneWindow: `${ productRoute }/window/delete`,
    deleteOneDoor: `${ productRoute }/door/delete`,
    deleteOneHouse: `${ productRoute }/house/delete`,
}

export default productApis;