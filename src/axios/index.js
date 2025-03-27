import axios, { InternalAxiosRequestConfig, AxiosResponse } from "axios";
const baseURL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4001';

// 请求拦截
axios.interceptors.request.use((config) => {
    //配置全局axios
    config.baseURL = baseURL //配置前缀url
    config.withCredentials = true //携带cookie
    return config;
}, (error) => {
    return Promise.reject(error)
})

//响应拦截
axios.interceptors.response.use(({data}) => {
    console.log(data, 'configresponse')
    console.log(axios, 'axios')
    return data
}, (error) => {
    return Promise.reject(error)
})
export default axios;

