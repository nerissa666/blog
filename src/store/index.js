import { createStore } from 'vuex'
import { reactive } from 'vue'
export default createStore({
  state: {
    baseURL: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4001',
    infoLogin: {}
  },
  getters: {
    baseURL: state => state.baseURL,
    infoLogin: state => state.infoLogin,
  },
  mutations: {
    setInfoLogin(state, infoLogin) {
      // console.log(infoLogin, 'infoLoginvalue')
      // state.infoLogin = infoLogin;
      Object.assign(state.infoLogin, infoLogin);
      // console.log(state.infoLogin, "state.infoLoginmutations");
    },
  },
  actions: {
    setInfoLogin(context, infoLogin) {
      context.commit('setInfoLogin', infoLogin);
    },
  },
  modules: {
  }
})
