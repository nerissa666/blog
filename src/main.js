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


import { message } from 'ant-design-vue';
const app = createApp(App)
app.config.productionTip = false;
app.config.globalProperties.$message = message;
app.use(store).use(router).use(Antd).mount('#app')

