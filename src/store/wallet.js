import cutAddress from '@/helpers/cutAddress';
import API from '@/helpers/api';

function state() {
    return {
        address: null,
        ensName: ''
    };
}

const getters = {
    loggedIn: (state) => !!state.address,
    croppedAddress: (state) => cutAddress(state.address),
    addressOrName: (state) => state.ensName || cutAddress(state.address)
};

const mutations = {
    setAddress(state, payload) {
        state.address = payload;
    },
    setWallet(state, payload) {
        state.wallet = payload;
    },
    setAddressEnsName(state, payload) {
        state.ensName = payload;
    },

};

const actions = {
    setAddress({ commit }, payload) {
        commit('setAddress', payload);
    },
    setWallet({ commit }, payload) {
        commit('setWallet', payload);
    },
    async fetchAndSetEnsName({ commit, state }) {
        let addressName = '';

        try {
            addressName = await API.provider.lookupAddress(state.address)
        } catch (e) {
            console.log(e);
        }

        commit('setAddressEnsName', addressName);
    }

};

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}
