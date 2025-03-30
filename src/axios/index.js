import axios, { InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { message } from "ant-design-vue";
import store from '@/store'
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

const baseURL = process.env.VUE_APP_API_BASE_URL;

// 请求拦截
axios.interceptors.request.use((config) => {
    // /contact
    console.log(config, 'config')
    // if (['/contact', '/msg/like/parent','/msg/like/child','/msg/submit', '/msg/reply/submit'].includes(config.url)) {
    if (!Object.keys(store.state.infoLogin).length && ['contact', 'msg'].includes(config.url.split('/')[1])) {
        message.error('请先登录')
        source.cancel('请先登录');
        config.cancelToken = source.token;
        return config
    }
    // if (!Object.keys(store.state.infoLogin).length) {
    //     return Promise.reject(new Error('请先登录'))
    // }
    //配置全局axios
    config.baseURL = baseURL //配置前缀url
    config.withCredentials = true //携带cookie    
    return config;
}, (error) => {
    if (axios.isCancel(error)) {
        console.log(error, 'axios.isCancel(error)')
    } else {
        message.error(error.msg)
    }
})

//响应拦截
axios.interceptors.response.use(({ data, config }) => {

    if (typeof data === 'object' && data !== null) {
        let code, msg, rest
        if (Array.isArray(data)) {
            const { code: _code, msg: _msg, ..._rest } = data[0]
            code = _code
            msg = _msg
            rest = _rest
        } else {
            const { code: _code, msg: _msg, ..._rest } = data
            code = _code
            msg = _msg
            rest = _rest
        }
        if (code === 0 && msg) {
            if (['contact', 'msg','reg', 'adminServer'].includes(config.url.split('/')[1])) {
                message.success(msg)
            }
        } else {
            message.error(msg)
        }
        rest.code = code
        return code === 0 && rest
    } else {
        return data
    }
}, (error) => {
    return error
})
export default axios;

