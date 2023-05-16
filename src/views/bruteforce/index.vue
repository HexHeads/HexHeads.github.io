<template>
    <div>
        <div class="flex -mt-12 -mx-12 mb-[50px] md:flex-col md:text-center md:items-center">
            <div class="px-12 mt-12">
                <div class="shadow-[0_0_15px_rgba(0,_0,_0,_0.25)]">
                    <!--      :placeholder="!wasFound"              -->
                    <HexHead
                        :is-canvas="true"
                        :placeholder="!formDataTraitsValues.filter(Boolean).length"
                        size="xl"
                    />
                </div>
            </div>
            <div class="flex flex-col px-12 mt-12">
                <div class="flex flex-wrap -mx-[20px] -mt-6">
                    <div
                        class="w-1/2 px-[20px] mt-6"
                        v-for="(item, key) in formTraits"
                        :key="key"
                    >
                        <div
                            class="h-[74px] px-4 bg-white border border-black cursor-pointer flex items-center"
                            @click="openChoice(item, key, key === 'bubbleColor' && 'color')"
                        >
                            {{ item.title }}
                            <div
                                v-if="key !== 'bubbleColor' && formData.traits[key] !== ''"
                                class="h-[32px] w-[32px] ml-4 bg-no-repeat"
                                :class="{
                                    'scale-[1.8]': ['accessory', 'head', 'mouth', 'eyes'].includes(key)
                                }"
                                :style="`background-image:url(${ require(`@/assets/images/hexheads/${ item.sprite }.png`) });background-position:${ -(formData.traits[key] - (Math.floor((formData.traits[key] / 16))) * 16) * 32 }px ${ Math.floor((formData.traits[key] / 16)) * -32 }px;`"
                            >
                            </div>
                            <BaseClose
                                v-if="formData.traits[key] !== ''"
                                class="ml-auto"
                                @click.stop="formData.traits[key] = ''"
                            />
                        </div>
                    </div>
                </div>
                <div class="mt-auto lg:mt-6">
                    <BaseButton
                        v-if="!isBruteforcing || isFind"
                        class="w-full"
                        size="xl"
                        @click="bruteforce"
                    >
                        Bruteforce
                    </BaseButton>
                    <BaseButton
                        v-else
                        class="w-full"
                        size="xl"
                        @click="stopBruteforce"
                    >
                        Stop bruteforce
                    </BaseButton>
                </div>
            </div>
        </div>
        <div class="mb-10">
            <div class="text-xl mb-2 break-words">
                Address: {{ account.address || '???' }}
            </div>
            <div class="text-xl break-words">
                Private Key: {{ account.privateKey || '???' }}
            </div>
        </div>
        <div class="mb-[45px]">
            <div class="text-xxl mb-8">
                About Bruteforce
            </div>

            <div class="text-md">
                <div class="mb-9">
                    This page allows you to find the <span class="text-primary-500">Private Key</span> for the wallet that owns the NFT you want to claim!
                </div>

                <div>
                    Select traits and bruteforce.<br>
                    Depending on how many traits you specify it might take some time.<br>
                    When the Private Key will be found, copy it and import it in your MetaMask.
                </div>
            </div>
        </div>
        <div>
            <div class="text-xxl mb-8">
                Safety
            </div>
            <div class="pl-5 space-y-1 text-md sm:pl-2">
                <ListItem>
                    This page is also available at GitHub Pages domain: <ActionLink class="break-words" theme="secondary">HexHeads.github.io/bruteforce.html</ActionLink>
                </ListItem>
                <ListItem>
                    The source code of this page might be reviewed in <ActionLink theme="secondary">GitHub repository</ActionLink> serving this page via GitHub Pages.
                </ListItem>
                <ListItem>
                    <span class="text-primary-500">This page works offline</span>, so you can turn off the internet connection while the process.
                </ListItem>
                <ListItem>
                    This page uses Web3.js for wallet generation.
                    <br>
                    The version of the library is the same with <ActionLink theme="secondary">the one published in web3.js Github</ActionLink> and may be verified.
                </ListItem>
                <ListItem>
                    The randomness seed is up to Web3 library.
                </ListItem>
                <ListItem>
                    Everything is provided "as it is" and you're the only who's responsible for your Private Keys.
                </ListItem>
                <ListItem >
                    <span class="text-primary-500">DYOR</span>
                </ListItem>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import Web3 from 'web3';
import HexHead from '@/components/HexHead/HexHead';
import SelectField from '@/components/Form/SelectField/SelectField';
import ActionLink from '@/components/ActionLink/ActionLink';
import BaseButton from '@/components/BaseButton/BaseButton';
import BaseClose from '@/components/BaseClose/BaseClose';
import ListItem from '@/components/ListItem/ListItem';
import { open } from '@/composables/useLayer';
import { getTraits, getTraitsForForm } from '@/helpers/getTraits';
import { drawFromTraits, generateTraits } from '@/helpers/renderer';

// META

const web3 = new Web3;

const stop = ref(false);

const account = ref({
    address: '',
    privateKey: ''
});

// META: TRAITS

const traits = getTraits();
const formTraits = getTraitsForForm();

const formData = ref({
    traits: Object.fromEntries(Object.keys(traits).map((item) => [item, '']))
});

const formDataTraitsValues = computed(() =>[...Object.values(formData.value.traits).map(item => item === '' ? undefined : item)]);

const wasFound = ref(false);

watch(formData.value.traits, () => {
    stop.value = true;
    drawFromTraits(formDataTraitsValues.value);
});

// BRUTEFORCE

const isBruteforcing = ref(false);

const isFind = ref(false);

function bruteforce() {
    stop.value = false;
    isFind.value = false;
    isBruteforcing.value = true;
    startBruteforce();
}

function stopBruteforce() {
    stop.value = true;
    isBruteforcing.value = false;
}

function startBruteforce() {
    if (stop.value) {
        return;
    }

    const { address, privateKey } = web3.eth.accounts.create();
    const actualTraits = generateTraits(address);

    account.value = {
        address,
        privateKey
    };

    drawFromTraits(actualTraits);

    for(let i = 0; i <= 6; i++) {
        if (formDataTraitsValues.value[i] !== undefined && formDataTraitsValues.value[i] !== actualTraits[i]) {
            setTimeout(startBruteforce, 10)
            return;
        }
    }

    isFind.value = true;
    wasFound.value = true;
}


// OPEN CHOICE

async function openChoice(item, key, type) {
    const id = await open('BruteforceChoice', {
        title: item.title,
        items: item.items,
        type,
        spriteIndex: item.sprite
    });

    formData.value.traits[key] = id;
}
</script>
