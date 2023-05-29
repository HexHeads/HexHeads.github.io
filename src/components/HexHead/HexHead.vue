<template>
    <div
        :class="classes.root"
    >
        <BaseImage
            v-if="placeholder"
            :class="classes.image"
        />
        <canvas
            v-show="!placeholder"
            :id="`canvas${ id ? '-' + id : '' }`"
            :class="classes.image"
            width="32"
            height="32"
        />
    </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, watch } from 'vue';
import makeClasses from '@/helpers/makeClasses';
import { generate } from '@/helpers/renderer';


// META

/**
 * @param to
 * @param 'xl'  size
 * @param { root: any, color: any } themeSettings
 */
const props = defineProps({
    address: String,
    size: String,
    isCanvas: Boolean,
    placeholder: Boolean,
    id: String,
    themeSettings: Object
});


// CLASSES

const useClasses = makeClasses(() => ({
    root: ({ themeSettings, size }) => [themeSettings?.root,
        'overflow-hidden',
        {
            'w-[552px] h-[552px] sm:w-[300px] sm:h-[300px]': size === 'xl',
            'w-full h-full': !size
        }
    ],
    image: ({ size }) => [
        'w-full h-full'
    ]
}));


const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
        size: props.size
    });
});

onMounted(() => {
    generate(props.address, props.id);
});

watch(() => props.address, () => {
    generate(props.address, props.id);
})
</script>
