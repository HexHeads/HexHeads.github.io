import API from '@/helpers/api';

export default class OperatorService {
    static async mint(name) {
        return API.send({
            contractName: 'operator',
            methodName: 'mint',
            needWait: true,
            needReceipt: true,
            params: [name]
        });
    }

    static async upgrade(id, level) {
        return API.send({
            contractName: 'operator',
            methodName: 'upgrade',
            needWait: true,
            needReceipt: true,
            params: [id, level]
        });
    }
}
