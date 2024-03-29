import Wallet from '@/wallets';
import API from '@/helpers/api';
import wait from '@/helpers/wait';
import { store } from '@/store';

export default async function walletsInit({ next, from }) {
    if (!from.name) {
        await wait(() => document.readyState === 'complete');
        await API.init();
        await Wallet.init();
        store.dispatch('wallet/fetchAndSetEnsName');
    }

    return next();
}
