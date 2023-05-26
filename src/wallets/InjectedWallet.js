import API from '@/helpers/api';
import { store } from '@/store';
import emitter from '@/plugins/mitt';

function init(target, propertyKey, propertyDescriptor) {

    const originalMethod = propertyDescriptor.value;

    propertyDescriptor.value = (...args) => {
        if (!target.instance) {
            target.init();
        }

        return originalMethod.apply(this, args);
    };
}

function needsProvider(target, propertyKey, propertyDescriptor) {

    const originalMethod = propertyDescriptor.value;

    propertyDescriptor.value = (...args) => {
        if (window.ethereum) {
            //@ts-ignore
            return originalMethod.apply(this, args);
        }
    };
}

class InjectedWallet {
    static init() {
        InjectedWallet.handleAll();
    }

    @init
    @needsProvider
    static async login() {
        await API.provider.send('eth_requestAccounts', []);
        const address = (await API.provider.listAccounts())[0];

        store.dispatch('wallet/setAddress', address);

        return address;
    }

    static handleAll() {
        InjectedWallet.networkAccountsChange();
        InjectedWallet.handleNetworkChange();
    }

    @init
    @needsProvider
    static async tryConnectAndSetAddress(_address){
        const address = _address || (await API.provider.listAccounts())[0];
        store.dispatch('wallet/setAddress', address);

        return address;
    }

    static async disconnect() {
    }

    @needsProvider
    static networkAccountsChange() {
        window.ethereum?.on('accountsChanged', async () => {
            const address = (await API.provider.listAccounts())[0];

            store.dispatch('wallet/setAddress', address);
            emitter.emit('accountChanged');
            console.log('accountsChanged')
        })
    }

    static handleNetworkChange() {
        window.ethereum?.on('chainChanged', async () => {
            window.location.reload();
        });
    }
}

export default InjectedWallet;
