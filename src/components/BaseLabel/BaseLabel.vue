<template>
    <div
        :class="classes.root"
    >
        <slot></slot>
    </div>
</template>


<script setup>
import { computed } from 'vue';
//import  from '@/components/';
import makeClasses from '@/helpers/makeClasses';

// META

const props = defineProps({

});


// CLASSES

const useClasses = makeClasses(() => ({
    root: ({ themeSettings }) => [themeSettings?.root,
        'px-6 pt-1 pb-2 bg-primary-500 bg-opacity-10 leading-[0.8] text-primary-500 rounded-[2px]'
    ]
}));

const classes = computed(() => {
    return useClasses({
        themeSettings: props.themeSettings
    });
});
</script>
