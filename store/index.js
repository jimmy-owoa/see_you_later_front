import axios from "axios";

export const state = () => ({
  env: {}
})

export const mutations = {
  setEnv(state, env) {
    state.env = env
  }
}

export const actions = {
  nuxtServerInit({ commit }) {
    if (process.server) {
      commit('setEnv', {
        DEV: process.env.DEV_API,
        PROD: process.env.PROD_API || 'default value'
      })
    }
  }
}