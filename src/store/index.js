import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    application: {
      token: localStorage.getItem('token'),
      ip: localStorage.getItem('IP')
    }
  },
  mutations: {
    setApplication(state, application) {
      state.application = application
    }
  },
  getters: {
    application(state){
      return state.application
    }
  },
  actions: {
    setApplication({commit}, application) {
      if(application && application.token) {
        localStorage.setItem('token', application.token)
      } else {
        localStorage.removeItem('token')
      }
      commit('setApplication', application)
    }
  },
  modules: {
  }
})
