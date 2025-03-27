import { createStore } from 'vuex'
import { reactive } from 'vue'
export default createStore({
  state: {
    baseURL: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4001',
    infoLogin: {},
    activeKey: '/',
  },
  getters: {
    baseURL: state => state.baseURL,
    infoLogin: state => state.infoLogin,
    user: state => state.infoLogin._id,
    isAdmin: state =>  state.infoLogin.admin,
    activeKey: state => state.activeKey
  },
  mutations: {
    setInfoLogin(state, infoLogin) {
      // state.infoLogin = infoLogin;
      Object.assign(state.infoLogin, infoLogin);
    },
    setActiveKey(state, activeKey) {
      state.activeKey = activeKey;
    },
  },
  actions: {
    setInfoLogin(context, infoLogin) {
      context.commit('setInfoLogin', infoLogin);
    },
    setActiveKey(context, activeKey) {
      context.commit('setActiveKey', activeKey);
    },
  },
  modules: {
  }
})
