import API from '@/helpers/api';

export default class HexHeadsService {
    static async ownerOf(address) {
        return API.get({
            contractName: 'hexHeads',
            methodName: 'ownerOf',
            params: [address]
        });
    }

    static async mint() {
        return API.send({
            contractName: 'hexHeads',
            methodName: 'mint',
            needWait: true,
            needReceipt: true,
            params: []
        });
    }
}
