import { createStore } from 'vuex'

export default createStore({
  state: {
    baseURL: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4001',
    infoLogin: null,
  },
  getters: {
    getInfoLogin: state => state.infoLogin,
    baseURL: state => state.baseURL,
    infoLogin: state => state.infoLogin,
  },
  mutations: {
    setInfoLogin(state, infoLogin) {
      state.infoLogin = infoLogin;
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
