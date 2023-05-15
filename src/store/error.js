function state() {
    return {
        status: null
    };
}

const mutations = {
    setError(state, payload) {
        state.status = payload;
    },
    removeError(state) {
        state.status = null;
    },
};

const actions = {
    async setError({ commit }, payload) {
        commit('setError', payload);
    },
    async removeError({ commit }) {
        commit('removeError');
    }
};

export default {
    state,
    mutations,
    actions,
    namespaced: true
}
