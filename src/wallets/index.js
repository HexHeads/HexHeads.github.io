import InjectedWallet from './InjectedWallet';
import { store } from '@/store';

class Wallet {
    static InjectedWallet = InjectedWallet;

    static async disconnect() {
        return await Wallet.currentWallet.disconnect();
    }

    static get currentWallet() {
        return InjectedWallet;
    }

    static get currentWalletName() {
        return store.state.wallet.wallet;
    }

    static async init() {
        await InjectedWallet.tryConnectAndSetAddress();
    }
}

export default Wallet;
