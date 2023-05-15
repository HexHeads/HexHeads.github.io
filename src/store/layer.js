import { markRaw  } from 'vue';
import { createId } from '@/helpers/uuid';

function state() {
    const items = [];

    return {
        items
    };
}

const getters = {
    layerById: (state) => id => {
        const find = state.items.find(item => item.id === id);

        return find;
    }
};

const mutations = {
    add(state, payload) {
        const find = state.items.find(item => item.id === payload.id);

        if (find) return;

        state.items.push({
            ...payload,
            isOpened: false
        });
    },
    update(state, payload) {
        const findIndex = state.items.findIndex(item => item.id === payload.id);

        if (~findIndex) {
            state.items.splice(findIndex, 1, {
                ...state.items[findIndex],
                ...payload
            });
        }
    },
    close(state, payload) {
        const find = state.items.find(item => item.id === payload);

        if (find) {
            find.isOpened = false;
        }
    },
};

const actions = {
    async add({ commit, getters }, payload) {
        const find = getters['layerById'](payload);
        const id = payload + '-' + createId();
        let component;


        if (!find) {
            /* eslint-disabled */
            component = await import('@/components/Layers/' + `${ payload }/${ payload }.vue`);

            commit('add', {
                id,
                name: payload,
                component: markRaw(component.default)
            });
        }

        return getters['layerById'](id);
    },
    async update({ commit }, payload) {
        commit('update', payload);
    },
    async close({ commit }, payload) {
        commit('close', payload);
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}
