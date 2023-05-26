import { alert } from '@/composables/useLayer';
import { store } from '@/store';
import API from '@/helpers/api';

const networksChains = {
    mumbai: '0x13881',
    goerli: '0x5',
    ethereum: '0x1'
};

async function changeNetworkRequest(network) {
    const currentNetwork = await API.getNetwork();

    if (currentNetwork === 'ethereum') {
        return;
    }

    const isChangeNetwork = await alert({
        title: 'Wrong network',
        text: `Please switch you network to ${ network }.`,
        buttonText: 'Switch',
        cancelButtonText: '',
        status: 'error',
        closeOnClickOutside: false
    });

    if (isChangeNetwork) {
        try {
            await window.ethereum?.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: networksChains[network] }]
            });

            return true;
        } catch (e) {
            return false;
        }
    }

    return false;
}

export default changeNetworkRequest;
