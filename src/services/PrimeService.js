import API from '@/helpers/api';

export default class UpgradeService {
    static async getPrimes(address) {
        let [data, error] = await API.getVar({
            contractName: 'prime',
            varName: 'balanceOf',
            params: [address]
        });

        return [data, error];
    }
}
