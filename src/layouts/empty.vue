<template>
    <RouterView :key="$route.path + viewKeyCounter" />
</template>

<script setup>
import { computed } from 'vue';
import { store } from '@/store';

const viewKeyCounter = computed(() => store.state.app.viewKey);
</script>
