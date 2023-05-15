import { utils } from 'ethers';
import API from '@/helpers/api';

export default class UpgradeService {
    static async getPrice() {
        let [data, error] = await API.getVar({
            contractName: 'upgrade',
            varName: 'price'
        });

        return [data && utils.formatEther(data), error];
    }

    static async getPriceStep() {
        let [data, error] = await API.getVar({
            contractName: 'upgrade',
            varName: 'priceStep'
        });

        return [data && utils.formatEther(data), error];
    }

    static async mint(to, amount, eth) {
        let [data, error] = await API.send({
            contractName: 'upgrade',
            methodName: 'mint',
            needWait: true,
            params: [to, amount, {
                value: utils.parseEther(eth.toFixed(6))
            }]
        });

        return [data, error];
    }

    static async getUserUpgrades(address) {
        let [data, error] = await API.getVar({
            contractName: 'upgrade',
            varName: 'balanceOf',
            params: [address, 1]
        });

        return [data, error];
    }
}
