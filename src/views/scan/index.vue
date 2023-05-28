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
                <div
                    v-if="resultAddress"
                    class="mb-3"
                >
                    <div class="mb-3">
                        <template v-if="owner">
                            Claimed by <ActionLink theme="secondary" :href="addressLink" target="_blank">{{ cutAddress(owner) }}</ActionLink>
                        </template>
                        <template v-else>
                            Not claimed yet
                        </template>
<!--                        Claimed on 12 Jan 2023 by <ActionLink theme="secondary" href="#">0x1CcA...C912</ActionLink>-->
                    </div>
                    <div class="flex justify-between">
                        <div class="mb-3">
                            Role: <span class="text-primary-500">Observer</span>
                        </div>
                        <div>
                            <ActionLink
                                v-if="opensea"
                                theme="secondary"
                                :href="opensea"
                                target="_blank"
                            >
                                OpenSea
                            </ActionLink>
<!--                            |  <ActionLink theme="secondary">LooksRare</ActionLink> |  <ActionLink theme="secondary">Frenly</ActionLink>-->
                        </div>
                    </div>
                    <div
                        v-if="privateKey"
                        class="mb-3 break-words"
                    >
                        Private key (will be destroyed after page reload):
                        <br>
                        {{ privateKey }}
                    </div>
                </div>

                <div
                    v-if="resultAddress"
                    class="flex flex-wrap -mx-[20px] -mt-6"
                >
                    <div
                        class="w-1/2 px-[20px] mt-6 sm:w-full"
                        v-for="(item, key) in traits"
                        :key="key"
                    >
                        <div class="h-[74px] flex items-center border-2 border-black text-md text-center px-4 py-2 relative">
                            <div class="text-primary-500 mr-auto">
                                {{ item.title }} {{ item.value }}
                            </div>
                            <div
                                v-if="['decorationColor', 'backgroundColor'].includes(key)"
                                class="h-[32px] w-[32px]"
                                :style="`background-color:${ item.value }`"
                            >
                            </div>
                            <div
                                v-else-if="item.value !== undefined"
                                class="h-[32px] w-[32px] bg-no-repeat"
                                :class="{
                                    'scale-[1.8]': ['extra', 'head', 'mouth', 'eyes'].includes(key)
                                }"
                                :style="`background-image:url(${ require(`@/assets/images/hexheads/${ item.sprite }.png`) });background-position:${ -(item.value - (Math.floor((item.value / 16))) * 16) * 32 }px ${ Math.floor((item.value / 16)) * -32 }px;`"
                            >
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
<!--                There are more than <span class="text-primary-500">1.5 quadrillion</span> unique HexHeads and exactly-->
<!--                <br>-->
<!--                1'461'501'637'330'902'918'203'684'832'716'283'019'655'932'542'975 in total and every Ethereum address owns one!-->
<!--                <br><br>-->
                HexHeads are supported by several Web3 projects to render users' avatars in their apps, but there's more...
                <br><br>
                Since these NFTs are owned by everyone, HexHeads is <span class="text-primary-500">the largest Web3 community</span> and a DAO.
                <br>
                There are two roles: Observer and Prime.
                <br><br>
                Fell free to claim your NFT for free, join our <ActionLink
                theme="secondary"
                href="https://discord.gg/xMRhYCMbQ7"
                target="_blank"
            >
                Discord
            </ActionLink> and become an Observer.
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
import cutAddress from '@/helpers/cutAddress';
import HexHeadsService from '@/services/HexHeadsService';

import { store } from '@/store';

// META

const route = useRoute();

const address = ref(route.query.address || '');

const field = ref(address.value);

const traits = ref({});


// PRIVATE KEY

const privateKey = store.state.collection.privateKey;

if (privateKey) {
    store.dispatch('collection/removePrivateKey');
}

// SEARCH

const isSearching = ref(false);

const searchDebounced = debounce(search, 500);

const resultAddress = computed(() => utils.isAddress(address.value) ? address.value : '');

async function search() {
    const value = field.value.trim();

    isSearching.value = true;

    try {
        let resultAddress = '';

        if (utils.isAddress(value)) {
            resultAddress = value;
        } else {
            const addressName = await API.provider?.resolveName(value);

            if (addressName) {
                resultAddress = addressName;
            }
        }


        address.value = resultAddress;
        setTraits();
        if (resultAddress) {
            await checkAndSetMint();
        }
    } catch (e) {
        console.log(e);
        traits.value = {};
    }

    isSearching.value = false;
}

setTraits();

watch(field, searchDebounced);

function setTraits() {
    if (address.value) {
        const items = generateTraits(address.value);

        console.log(items);

        items[items.length - 1] = undefined;

        traits.value = getTraitsByIndexex(items);
    }
}


// OWNER

const owner = ref('');

async function checkAndSetMint() {
    owner.value = null;

    if (!address.value) {
        return;
    }

    const [mintedAddress] = await HexHeadsService.ownerOf(address.value);

    owner.value = mintedAddress;
}

checkAndSetMint();


// OPENSEA LINK

// eslint-disable-next-line no-undef
const opensea = computed(() => owner.value ? `https://opensea.io/assets/ethereum/${ process.env.VUE_APP_HEXHEADS_ADDRESS_ETHEREUM }/${ BigInt(owner.value).toString() }` : '');

const addressLink = computed(() => owner.value ? `https://etherscan.io/address/${owner.value }` : '');
</script >
