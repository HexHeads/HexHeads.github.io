<template>
    <div>
        <div class="flex -mt-12 -mx-12 mb-[71px] relative md:flex-col md:text-center md:items-center">
            <div v-if="isSearching" class="-preloader-dots"></div>
            <div class="px-12 mt-12">
                <div class="drop-shadow-[0_0_15px_rgba(0,_0,_0,_0.25)]">
                    <HexHead
                        :placeholder="!resultAddress"
                        :address="resultAddress"
                        size="xl"
                    />
                </div>
            </div>
            <div class="flex flex-col px-12 mt-12 flex-grow md:w-full">
                <TextField
                    v-model="field"
                    class="mb-3"
                    placeholder="Address / ENS / ID"
                />
                <template
                    v-if="resultAddress"
                >
                    <div class="mb-3">
                        Claimed on 12 Jan 2023 by <ActionLink theme="secondary" href="#">0x1CcA...C912</ActionLink>
                    </div>
                    <div class="flex justify-between">
                        <div class="mb-6">
                            Role: <span class="text-primary-500">Prime</span>
                        </div>
                        <div>
                            <ActionLink theme="secondary">OpenSea</ActionLink> |  <ActionLink theme="secondary">LooksRare</ActionLink> |  <ActionLink theme="secondary">Frenly</ActionLink>
                        </div>
                    </div>
                </template>

                <div
                    v-if="resultAddress"
                    class="flex flex-wrap -mx-[20px] -mt-6"
                >
                    <div
                        class="w-1/2 px-[20px] mt-6"
                        v-for="(item, index) in traits"
                        :key="index"
                    >
                        <div class="h-[72px] border-2 border-black text-md text-center px-4">
                            <div class="text-primary-500">
                                {{ item.title }}
                            </div>
                            <div class="-mt-1.5">
                                {{ item.value || '???' }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class="text-xxl mb-8">
                HexHeads are faces of Ethereum community!
            </div>
            <div class="text-md">
                There are more than <span class="text-primary-500">1.5 quadrillion</span> unique HexHeads and exactly
                <br>
                1'461'501'637'330'902'918'203'684'832'716'283'019'655'932'542'975 in total and every Ethereum address owns one!
                <br><br>
                HexHeads are supported by several Web3 projects to render users' avatars in their apps, but there's more...
                <br><br>
                Since these NFTs are owned by everyone, HexHeads is <span class="text-primary-500">the largest Web3 community</span> and a DAO.
                <br>
                There are two roles: Observer and Prime.
                <br><br>
                Fell free to claim your NFT for free, join our <ActionLink theme="secondary">Discord</ActionLink> and become an Observer.
                <br>
                If you wish to access our private server, take a part in DAO voting and get all benefits, chase for the Prime role.
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch , computed } from 'vue';
import { useRoute } from 'vue-router';
import { utils } from 'ethers';
import { debounce } from 'lodash';
import HexHead from '@/components/HexHead/HexHead';
import ActionLink from '@/components/ActionLink/ActionLink';
import TextField from '@/components/Form/TextField/TextField';
import API from '@/helpers/api';

import { getTraitsByIndexex } from '@/helpers/getTraits';
import { generateTraits } from '@/helpers/renderer';

// META

const route = useRoute();

const address = ref(route.query.address || '');

const field = ref(address.value);

const traits = ref({});


// SEARCH

const isSearching = ref(false);

const searchDebounced = debounce(search, 500);

const resultAddress = computed(() => utils.isAddress(address.value) ? address.value : '');

async function search() {
    isSearching.value = true;

    try {
        let resultAddress = '';

        if (utils.isAddress(field.value)) {
            resultAddress = field.value;
        } else {
            const addressName = await API.provider.resolveName(field.value);

            if (addressName) {
                resultAddress = addressName;
            }
        }

        const items = generateTraits(resultAddress);

        traits.value = getTraitsByIndexex(items);
        address.value = resultAddress;
    } catch (e) {
        console.log(e);
        traits.value = {};
    }

    isSearching.value = false;
}

watch(field, searchDebounced);
</script>
