<template>
    <div v-scroll-at.bottom="addItems">
        <div>
            <div class="text-xxl mb-10">
                HeadsCollection
            </div>
            <div class="flex flex-wrap -mx-3 -mt-10 relative">
                <div v-if="loading" class="-preloader-dots"/>
                <div
                    v-for="item in items"
                    :key="item"
                    class="px-3 mt-10 w-1/6 xl:w-1/5 lg:w-1/4 md:w-1/3 sm:w-1/2"
                >
                    <CollectionCard
                        class="w-full cursor-pointer"
                        :address="item.address"
                        :is-gallery="true"
                        :id="createId('collection-card')"
                        @click="to(item)"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Web3 from 'web3';
import CollectionCard from '@/components/CollectionCard/CollectionCard';
import wait from '@/helpers/wait';
import { createId } from '@/helpers/uuid';
import { store } from '@/store';


// META

const web3 = new Web3;

const router = new useRouter();

// COLLECTION

const items = ref([]);
const loading = ref(false);

async function getItem() {
    const { address, privateKey } = web3.eth.accounts.create();

    if (items.value.includes(address)) {
        getItem();

        return;
    }

    await wait(() => true, 100);

    return { address, privateKey };
}

async function addItems() {
    loading.value = true;
    await Promise.all([...Array(24).keys()].map(async () => items.value.push(await getItem())));
    loading.value = false;
}

addItems();

async function to(item) {
    store.dispatch('collection/setPrivateKey', item.privateKey);
    router.push({ name: 'scan', query: { address: item.address } });
}
</script>
