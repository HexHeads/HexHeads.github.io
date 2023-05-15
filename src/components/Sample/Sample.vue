<template>
    <div
        :class="classes.root"
    >
    </div>
</template>


<script setup>
import { computed } from 'vue';
//import  from '@/components/';
import {  } from './types';
import makeClasses from '@/helpers/makeClasses';
import ThemeSettings from '@/types/themeSettings';

// META

const props = defineProps({

});

const emit = defineEmits();


// CLASSES

const useClasses = makeClasses(() => ({
    root: ({ themeSettings }) => [themeSettings?.root,

    ]
}));

const classes = computed(() => {
    return useClasses({
        themeSettings: props.themeSettings
    });
});


// VALUE

const value = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit('update:modelValue', value)
    }
});
</script>
