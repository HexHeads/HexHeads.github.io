<template>
    <div :class="classes.root">
        <div :class="classes.inner">
            <div :class="classes.burger">
                <BaseBurger
                    @click="open('NavLayer')"
                />
            </div>
            <div
                :class="classes.logo"
                @click="toHome"
            >
                HexHeads
            </div>
            <div :class="classes.nav">
                <template
                    v-for="(item, index) in navItems"
                    :key="index"
                >
                    <div v-if="index" :class="classes.navDelimiter">|</div>
                    <div :class="classes.navItem">
                        <ActionLink
                            v-if="!item.active"
                            :class="classes.navLink"
                            :theme="!item.theme ? 'black' : ''"
                            :to="item.to"
                            :theme-settings="{
                                color: item.theme || ''
                            }"
                        >
                            {{ item.title }}
                        </ActionLink>
                        <div
                            v-else
                            :class="classes.navActive"
                        >
                            {{ item.title }}
                        </div>
                    </div>
                </template>
            </div>
            <div
                v-if="address"
                :class="classes.address"
            >
                {{ address }}
            </div>
            <BaseButton
                v-else
                :class="classes.button"
                :theme-settings="{
                    size: 'px-3 pt-1 pb-2'
                }"
                @click="login"
            >
                Connect Metamask
            </BaseButton>
        </div>
    </div>
</template>


<script setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import ActionLink from '@/components/ActionLink/ActionLink.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseBurger from '@/components/BaseBurger/BaseBurger.vue';
import { store } from '@/store';
import Wallet from '@/wallets';
import makeClasses from '@/helpers/makeClasses';
import cutAddress from '@/helpers/cutAddress';
import { open } from '@/composables/useLayer';


// META

const route = useRoute();
const router = useRouter();


// CLASSES

const useClasses = makeClasses(() => ({
    root: ({ themeSettings, theme }) => [themeSettings?.root,
        'border-b-[3px] border-black pb-3 lg:pt-3'
    ],
    inner: 'flex items-center justify-between container lg:justify-start',
    logo: ({ isHome }) => [
        'text-xxl lg:text-xl lg:-mt-2 lg:ml-4 sm:hidden',
        {
            'cursor-pointer': !isHome
        }
    ],
    nav: 'flex items-end lg:hidden',
    navDelimiter: 'mx-4 mt-auto mb-[1px]',
    navActive: 'text-primary-500',
    address: 'text-primary-500 lg:ml-auto',
    burger: 'hidden lg:block',
    button: 'lg:ml-auto'
}));

const classes = computed(() => {
    return useClasses({
        isHome: route.name === 'home'
    });
});


const navItems = computed(() => [
    {
        title: 'Bruteforce',
        to: { name: 'bruteforce' },
        active: route.name === 'bruteforce'
    },
    {
        title: 'Scan',
        to: 'scan',
        active: route.name === 'scan'
    },
    {
        title: 'Dashboard',
        to: { name: 'dashboard' },
        active: route.name === 'dashboard'
    },
    {
        title: 'DAO',
        to: '#',
        theme: 'text-[#666666]',
        active: route.name === ''
    },
    {
        title: 'Social',
        to: '#',
        active: route.name === 'social'
    },
    {
        title: 'Collection',
        to: { name: 'collection' },
        active: route.name === 'collection'
    },
]);


// TO HOME

function toHome() {
    if (route.name !== 'home') {
        router.push({ name: 'home' });
    }
}


// ADDRESS

const address = computed(() => cutAddress(store.state.wallet.address) || store.state.wallet.ensName);


// LOGIN

function login() {
    Wallet.InjectedWallet.login();
}
</script>
