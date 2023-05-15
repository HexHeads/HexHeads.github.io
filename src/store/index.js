import { createStore, useStore as baseUseStore } from 'vuex'
import layer from './layer'
import isMobile from './isMobile'
import error from './error'
import wallet from './wallet'
import app from './app'

export const key = Symbol();

export const store = createStore({
    modules: {
        layer,
        wallet,
        isMobile,
        error,
        app
    }
});

export function useStore () {
    return baseUseStore(key);
}
