<template>
    <BaseLayer
        :class="id"
        :id="id"
        position="left"
        :theme-settings="{
            container: classes.root
        }"
    >
        <div :class="classes.top">
            <BaseClose
                @click="close(id)"
            />
            <div
                :class="classes.logo"
                @click="toHome"
            >
                HexHeads
            </div>
        </div>
        <div :class="classes.nav">
            <template
                v-for="(item, index) in navItems"
                :key="index"
            >
                <div :class="classes.navItem">
                    <ActionLink
                        v-if="!item.active && !item.href"
                        :class="[classes.navLink, item.to === '#' && 'pointer-events-none opacity-30']"
                        :theme="!item.theme ? 'black' : ''"
                        :to="item.to"
                        :underline="false"
                        :theme-settings="{
                            color: item.theme || ''
                        }"
                        @click="close(id)"
                    >
                        {{ item.title }}
                    </ActionLink>
                    <ActionLink
                        v-else-if="item.href"
                        :class="[classes.navLink]"
                        :href="item.href"
                        theme="secondary"
                        target="_blank"
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
    </BaseLayer>
</template>

<script lang="ts" setup>
import useLayer from '@/composables/useLayer';
import BaseLayer from '@/components/Layers/BaseLayer/BaseLayer.vue';
import BaseClose from '@/components/BaseClose/BaseClose.vue';
import ActionLink from '@/components/ActionLink/ActionLink.vue';
import makeClasses from '@/helpers/makeClasses';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';


// META

const props =defineProps({
    id: String
})
const { close } = useLayer();

const route = useRoute();
const router = useRouter();


// CLASSES

const useClasses = makeClasses(() => ({
    root: ({ themeSettings }) => [themeSettings?.root,
        'create-dao-layer w-[400px] flex flex-col pb-3 pt-3 py-3'
    ],
    top: 'flex items-center border-b-[3px] border-black px-4 pb-3 mb-3',
    logo: ({ isHome }) => [
        'text-xl -mt-2 ml-4',
        {
            'cursor-pointer': !isHome
        }
    ],
    nav: 'px-4',
    navItem: 'mb-6',
    navActive: 'text-primary-500',
    address: 'text-primary-500 lg:ml-auto'
}));

const classes = computed(() => {
    return useClasses({
        isHome: route.name === 'home'
    });
});


// NAV
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
        title: 'Docs',
        href: 'https://docs.hexheads.io/'
    },
    {
        title: 'Opensea',
        href: 'https://opensea.io/collection/we-are-hexheads'
    },
    {
        title: 'Discord',
        href: 'https://discord.gg/xMRhYCMbQ7'
    },
]);

// TO HOME

function toHome() {
    router.push({ name: 'home' });
    close(props.id);
}
</script>

<style>
.fade-enter-active .create-dao-layer, .fade-leave-active .create-dao-layer {
    transition: transform .5s;
}
.fade-enter-from .create-dao-layer, .fade-leave-to .create-dao-layer  {
    transform: translateX(-100%);
}
</style>
