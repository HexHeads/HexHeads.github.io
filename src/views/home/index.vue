<template>
    <div>
        <div class="flex -mt-12 -mx-12 mb-[71px] md:flex-col md:text-center md:items-center">
            <div class="px-12 mt-12">
                <div class="drop-shadow-[0_0_15px_rgba(0,_0,_0,_0.25)]">
                    <HexHead
                        :address="address"
                        size="xl"
                    />
                </div>
            </div>
            <div class="flex flex-col flex-grow px-12 mt-12 relative">
                <div v-if="isMinted === null" class="-preloader"></div>
                <template v-else-if="isMinted">
                    <div class="text-xxl mb-6">
                        Welcome back,
                        <br>
                        <span class="text-primary-500">k0rean_rand0m.eth</span>!
                    </div>
                    <div class="text-md mb-6">
                        <div>
                            Continue your journey:
                        </div>
                        <div class="flex items-center md:justify-center">
                            <ActionLink
                                theme="secondary"
                                href="#"
                            >
                                Dashboard
                            </ActionLink>
                            <div class="mx-3">|</div>
                            <ActionLink
                                theme="secondary"
                                href="#"
                            >
                                Discord
                            </ActionLink>
                        </div>
                    </div>
                    <div class="text-md mt-auto">
                        <div class="mb-4">
                            DAO needs you!
                        </div>
                        <div class="relative">
                            <BaseImage
                                :src="require('@/assets/images/pages/home/soon.png')"
                                alt="soon"
                            />
                            <div class="absolute inset-0 text-xxl flex items-center justify-center">
                                Soon...
                            </div>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="mb-3 flex items-center justify-between">
                        <div class="text-xl">
                            Claim your HexHead!
                        </div>
                        <BaseLabel>
                            Free
                        </BaseLabel>
                    </div>
                    <div class="text-md my-auto">
                        Choose Prime Level of your HexHead and a name.
                        <br>
                        Current price per level is 0.1 Eth.
                        <br>
                        Each Prime Level gives this HexHead the same amount of voting power in HexHeads DAO.
                        <br>
                        The price is growing by 0.001 Eth each time a new
                        <br>
                        Prime HexHead is minted.
                    </div>
                    <div class="flex justify-between items-end">
                        <div class="flex-grow mr-4">
                            <TextField
                                v-model="formData.hexHeadName"
                                title="HexHead name"
                                view="default"
                                placeholder="HexHead"
                                :error="formErrors.hexHeadName"
                            />
                        </div>
                        <div>
                            <BaseButton
                                class="w-full"
                                size="xl"
                                :loading="isClaiming"
                                @click="claim"
                            >
                                Claim Observer
                            </BaseButton>
                        </div>
                    </div>
                </template>
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
import { computed, onBeforeMount, ref } from 'vue';
import BaseImage from '@/components/BaseImage/BaseImage';
import HexHead from '@/components/HexHead/HexHead';
import BaseButton from '@/components/BaseButton/BaseButton';
import ActionLink from '@/components/ActionLink/ActionLink';
import BaseLabel from '@/components/BaseLabel/BaseLabel';
import TextField from '@/components/Form/TextField/TextField';
import OperatorService from '@/services/OperatorService';
import NamesService from '@/services/NamesService';
import HexHeadsService from '@/services/HexHeadsService';
import useForm from '@/composables/useForm';
import emitter from '@/plugins/mitt';
import { store } from '@/store';


// META

const [formData, formErrors, checkErrors] = useForm({
    hexHeadName: {
        value: '',
        required: 'Empty field'
    }
});


// CLAIM

const isClaiming = ref(false);

async function claim() {
    const name = formData.value.hexHeadName !== 'HexHead' ? formData.value.hexHeadName : '';
    isClaiming.value = true;

    const [isClaimed, claimedError] = await NamesService.claimed(name);

    if (isClaimed) {
        formErrors.value.hexHeadName = 'This name is taken';
        isClaiming.value = false;

        return;
    }


    const [mintTrx, minterError] = await OperatorService.mint(name);

    if (!minterError) {
        isMinted.value = true;
    } else {
        formErrors.value.hexHeadName = 'An error has occurred';
    }

    isClaiming.value = false;
}


// MINTED

const isMinted = ref(null);

const address = computed(() => store.state.wallet.address);

emitter.on('accountChanged', checkAndSetMint);

onBeforeMount(checkAndSetMint);

async function checkAndSetMint() {
    isMinted.value = null;

    if (!address.value) {
        return;
    }

    const [mintedAddress] = await HexHeadsService.ownerOf(address.value);

    isMinted.value = mintedAddress !== ('0x' + '0'.repeat(40));
}
</script>
