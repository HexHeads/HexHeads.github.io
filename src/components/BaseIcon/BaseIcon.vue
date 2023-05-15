<template>
    <SvgSprite
        class="transition-fast"
        :symbol="name"
        :size="size"
        @click="emit('click')"
    />
</template>

<script setup>
import { computed } from 'vue';
import { SvgSprite } from 'vue-svg-sprite';

// META

const props = defineProps({
    name: {
        type: String
    },
    width: {
        type: [String, Number],
        default: 16
    },
    height: {
        type: [String, Number]
    },
});

const emit = defineEmits(['click']);


// SIZE

const size = computed(() => `${ +props.width } ${ (props.height && +props.height) || +props.width }`);
</script>
