import API from '@/helpers/api';

export default class NamesService {
    static async claimed(name) {
        return API.get({
            contractName: 'nameRegistry',
            methodName: 'claimed',
            params: [name]
        });
    }
}
