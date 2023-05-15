function state() {
    return {
        viewKey: 0
    };
}

const mutations = {
    updateView: (state) => state.viewKey += 1,
};

const actions = {
    updateView({ commit }) {
        commit('updateView');
    },
};

export default {
    state,
    mutations,
    actions,
    namespaced: true
}
