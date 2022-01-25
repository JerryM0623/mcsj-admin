import Axios from '../utils/request';

class PermissionApis{
    /**
     * 根据页数请求当前页数对应的数据
     * @param pageNum
     * @param pageSize
     * @returns {Promise<AxiosResponse<any>|{}>}
     */
    async getDataByPageNum(pageNum, pageSize){
        try {
            return await Axios.get('/admin/permission/all',{
                params:{
                    pageSize,
                    pageNum
                }
            })
        }catch (e){
            console.log(e);
            return {};
        }
    }
}

export default new PermissionApis();