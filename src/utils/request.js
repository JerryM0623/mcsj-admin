// 二次封装Axios
import axios from 'axios';

const Axios = axios.create({});

// 设置请求的基础路由地址
Axios.defaults.baseURL = 'http://127.0.0.1:4000';
// 设置请求超时的时间
Axios.defaults.timeout = 5000;
// 允许携带 cookie 进行请求
Axios.defaults.withCredentials = true;
// 设置post请求的时候，携带的参数的信息
Axios.defaults.headers['Content-Type'] = 'application/json';

// 请求拦截器
Axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    token && (config.headers.Authorization = 'Bearer ' + token);
    return config;
},(error) => {
    return Promise.reject(error)
})
// 响应拦截器
Axios.interceptors.response.use((response) => {
    return response.data;
})

export default Axios;