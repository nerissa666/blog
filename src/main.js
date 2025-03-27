import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue';
import "ant-design-vue/dist/reset.css"
import 'normalize.css';
import './assets/css/font.css'
import "./assets/font/iconfont.css";
import './assets/css/reset.css'
import axios from './axios/index'
//配置全局axios
// axios.defaults.baseURL = baseURL //配置前缀url
// axios.defaults.withCredentials = true //携带cookie
import { message } from 'ant-design-vue';
const app = createApp(App)

console.log = process.env.NODE_ENV === 'production' ? function() {} : console.log
app.config.globalProperties.$axios = axios //添加到vue实例

app.config.productionTip = false;
app.config.globalProperties.$message = message;
app.use(store).use(router).use(Antd).mount('#app')

