<template>
    <div></div>
    <canvas class="w-[100vh] h-[100vh]" id="canvas" width="32" height="32"></canvas>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { generate } from '@/helpers/renderer';

// META

const route = useRoute();

document.body.style.overflow = 'hidden';

onMounted(() => {
    if (route.query.address) {
        generate(route.query.address);
    }
});
</script>

<style scoped>
canvas {
    width: 100vh;
    height: 100vh;
}
</style>
