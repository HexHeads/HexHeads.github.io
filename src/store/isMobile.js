function state() {
    return {
        width: 0
    };
}

const mutations = {
    setWidth: (state, payload) => state.width = payload
};

const actions = {
    setWidth({ commit }, payload) {
        commit('setWidth', payload);
    }
};

export default {
    state,
    mutations,
    actions,
    namespaced: true
}
