function state() {
    return {
        privateKey: '',
    };
}

const mutations = {
    setPrivateKey(state, payload) {
        state.privateKey = payload;
    },
    removePrivateKey(state, payload) {
        state.privateKey = '';
    },
};

const actions = {
    setPrivateKey({ commit }, payload) {
        commit('setPrivateKey', payload);
    },
    removePrivateKey({ commit }) {
        commit('removePrivateKey');
    }
};

export default {
    state,
    mutations,
    actions,
    namespaced: true
}
