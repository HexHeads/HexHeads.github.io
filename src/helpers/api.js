import { ethers } from 'ethers'
import { CPromise } from 'c-promise2';
import nameRegistryABI from '@/abi/nameRegistryABI';
import upgradeABI from '@/abi/upgradeABI';
import hexHeadsABI from '@/abi/hexHeadsABI';
import operatorABI from '@/abi/operatorABI';
import primeABI from '@/abi/primeABI';

class API {
    static provider;

    static async init(protocol = window.ethereum) {
        if (!API.provider) {
            API.setProvider(protocol);
        }
    }

    static setProvider(protocol) {
        API.provider = new ethers.providers.Web3Provider(protocol);
    }

    static get contracts() {
        return {
            nameRegistry: new ethers.Contract(process.env.VUE_APP_NAMES_ADDRESS, nameRegistryABI, API.provider),
            hexHeads: new ethers.Contract(process.env.VUE_APP_HEXHEADS_ADDRESS, hexHeadsABI, API.provider),
            operator: new ethers.Contract(process.env.VUE_APP_OPERATOR_ADDRESS, operatorABI, API.provider),
            upgrade: new ethers.Contract(process.env.VUE_APP_UPGRADE_ADDRESS, upgradeABI, API.provider),
            prime: new ethers.Contract(process.env.VUE_APP_PRIME_ADDRESS, primeABI, API.provider),
        };
    }

    static async getSigner()  {
        return API.provider?.getSigner();
    }

    static async getNetwork() {
        return (await API.provider?.getNetwork())?.name;
    }

    static async send(props) {
        console.log(props);
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
