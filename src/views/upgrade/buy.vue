<template>
    <div>
        <div class="flex -mt-12 -mx-12 mb-[71px]">
            <div class="px-12 mt-12">
                <div class="drop-shadow-[0_0_15px_rgba(0,_0,_0,_0.25)]">
                    <HexHead
                        :address="address"
                        size="xl"
                    />
                </div>
            </div>
            <div class="flex flex-col px-12 mt-12">
                <div class="mb-3 flex items-center justify-between">
                    <div class="text-xl">
                        Buy upgrades
                    </div>
                    <BaseLabel>
                        {{ stepPrice }}
                    </BaseLabel>
                </div>
                <div class="text-md my-auto">
                    Choose Prime Level of your HexHead and a name.
                    <br>
                    Current price per level is {{ stepPrice }} Eth.
                </div>
                <div class="flex justify-between items-end">
                    <div class="flex-grow mr-4">
                        <TextField
                            v-model="formData.amount"
                            title="Amount"
                            view="default"
                            mask="N"
                            placeholder="1"
                            :error="formErrors.amount"
                        />
                    </div>
                    <div>
                        <BaseButton
                            class="w-full"
                            size="xl"
                            :loading="isUpgrading"
                            @click="upgrade"
                        >
                            Upgrade for {{ resultPrice }} Eth
                        </BaseButton>
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
import { computed, onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import BaseLabel from '@/components/BaseLabel/BaseLabel';
import BaseImage from '@/components/BaseImage/BaseImage';
import HexHead from '@/components/HexHead/HexHead';
import BaseButton from '@/components/BaseButton/BaseButton';
import ActionLink from '@/components/ActionLink/ActionLink';
import TextField from '@/components/Form/TextField/TextField';
import OperatorService from '@/services/OperatorService';
import UpgradeService from '@/services/UpgradeService';
import useForm from '@/composables/useForm';
import { store } from '@/store';


// META

const { query } = useRoute();

const [formData, formErrors, checkErrors] = useForm({
    amount: {
        value: '',
        required: 'Empty field'
    }
});



// ADDRESS

const address = computed(() => store.state.wallet.address);


// PRICE. USED IN UPGRADE

const pricePending = ref(true);

const stepPrice = ref(null);

const price = ref(null);

const resultPrice = computed(() => formData.value.amount * price.value);

onBeforeMount(async() => {
    const [stepPriceValue] = await UpgradeService.getPriceStep();
    const [priceValue] = await UpgradeService.getPrice();

    stepPrice.value = stepPriceValue;
    price.value = priceValue;

    pricePending.value = false;
});


// UPGRADE

const isUpgrading = ref(false);

async function upgrade() {
    const [upgradeTrx, upgradeError] = await UpgradeService.mint(query.address, formData.value.amount, resultPrice.value);

    // formErrors.value.hexHeadName = 'An error has occurred';

    isUpgrading.value = false;
}
</script>
