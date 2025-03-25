import { createStore } from 'vuex'

export default createStore({
  state: {
    baseURL: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4001',
    infoLogin: null,
  },
  getters: {
    baseURL: state => state.baseURL,
    infoLogin: state => state.infoLogin,
  },
  mutations: {
    setInfoLogin(state, infoLogin) {
      Object.keys(infoLogin).forEach(key => {
        state.infoLogin[key] = infoLogin[key];
      });
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
