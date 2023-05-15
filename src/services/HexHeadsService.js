import API from '@/helpers/api';

export default class HexHeadsService {
    static async ownerOf(address) {
        return API.get({
            contractName: 'hexHeads',
            methodName: 'ownerOf',
            params: [address]
        });
    }
}
