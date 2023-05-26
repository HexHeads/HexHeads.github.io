import { ethers } from 'ethers'
import { CPromise } from 'c-promise2';
import hexHeadsABI from '@/abi/hexHeadsABI';

class API {
    static provider;

    static async init(protocol = window.ethereum) {
        if (!API.provider && protocol !== undefined) {
            API.setProvider(protocol);
        }
    }

    static setProvider(protocol) {
        API.provider = new ethers.providers.Web3Provider(protocol);
    }

    static get contracts() {
        return {
            hexHeads: new ethers.Contract(process.env.VUE_APP_HEXHEADS_ADDRESS_ETHEREUM, hexHeadsABI, API.provider),
        };
    }

    static async getSigner()  {
        return API.provider?.getSigner();
    }

    static async getNetwork() {
        const network = await API.provider?.getNetwork();
        const chainId = network?.chainId;
        const chainName = network?.name;

        const networkName = {
            137: 'polygon',
            5: 'goerli',
            80001: 'mumbai',
            1: 'ethereum'
        }[chainId];

        return networkName || chainName || '';
    }

    static async send(props) {
        try {
            const contract = props.contractAddress ? new ethers.Contract(props.contractAddress, props.contractABI, API.provider) : API.contracts[props.contractName];
            const signer = await API.getSigner();
            const contractWithSigner = contract.connect(signer);
            const contractWithSignerPromise = new CPromise(async(resolve, reject) => {
                try {
                    const trx = await contractWithSigner[props.methodName](...props.params);

                    resolve(trx);
                } catch (e) {
                    console.log(e);
                    reject(new Error(e));
                }
            });

            const trx = await contractWithSignerPromise;
            let trxReceipt;

            if (props.needWait) {
                await trx.wait();
            }

            if (props.needReceipt) {
                trxReceipt = await API.provider.getTransactionReceipt(trx.hash);
            }

            return [{ trx, trxReceipt }, null];
        } catch (e) {
            console.log(e);
            return [null, e];
        }
    }

    static async get(props) {
        try {
            const contract = props.contractAddress ? new ethers.Contract(props.contractAddress, props.contractABI, API.provider) : API.contracts[props.contractName];

            const result = await contract[props.methodName](...props.params);

            return [result, null];
        } catch (e) {
            console.log(e);
            return [null, e];
        }
    }

    static async getVar(props) {
        props.params = props.params || [];

        console.log(props.params);

        try {
            const contract = props.contractAddress ? new ethers.Contract(props.contractAddress, props.contractABI, API.provider) : API.contracts[props.contractName];

            const result = await contract[props.varName](...props.params);

            return [result, null];
        } catch (e) {
            console.log(e);
            return [null, e];
        }
    }
}
export default API;
