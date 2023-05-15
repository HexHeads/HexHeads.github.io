import API from '@/helpers/api';

async function isContract(address) {
    const code = await API.provider.getCode(address);

    return code !== '0x';
}

export default isContract;
