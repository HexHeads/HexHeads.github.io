import { store } from '@/store';

function useError(status) {
    store.dispatch('error/setError', status);
}

export default useError;
