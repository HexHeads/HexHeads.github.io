import { ref } from 'vue';


function useFetchData() {
    return ref({
        pending: true,
        data: null,
        cancel: () => {}
    })
}

function useFetchDataWithTotal() {
    return ref({
        pending: true,
        data: null,
        cancel: () => {}
    })
}

export {
    useFetchData,
    useFetchDataWithTotal
};
