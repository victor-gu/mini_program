const home = {
  state: {
    sessionKey: ''
  },
  mutations: {
    SET_SESSIONkEY (state, sessionKey) {
      state.sessionKey = sessionKey;
    }
  },
  actions: {
    // 保存sessionKey_key
    SessionKey ({ commit }, sessionKey) {
      commit('SET_SESSIONkEY', sessionKey);
    }
  }
}

export default home;
