<template>
    <ErrorPage v-show="hasError" />
    <template v-if="!hasError">
        <TheHeader class="mb-[50px]" />
        <div class="container mb-[50px]">
            <RouterView :key="$route.path + viewKeyCounter" />
            <div class="text-base mt-24">
                Art by <span class="text-primary-500">PiiiXL</span>
            </div>
        </div>
    </template>
    <Layers />
    <BaseNotifications />
</template>

<script setup>
import { computed } from 'vue';
import Layers from '@/components/Layers/Layers.vue';
import BaseNotifications from '@/components/BaseNotifications/BaseNotifications.vue';
import TheHeader from '@/components/TheHeader/TheHeader.vue';
import ErrorPage from '@/views/error/index.vue';
import { store } from '@/store';
import API from '@/helpers/api';
import changeNetworkRequest from '@/helpers/changeNetworkRequest';

const hasError = computed(() => !!store.state.error.status);

const viewKeyCounter = computed(() => store.state.app.viewKey);

if (API.provider) {
    changeNetworkRequest('ethereum');
}
</script>
