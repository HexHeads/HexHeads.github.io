<template>
    <div :class="classes.root">
        *
        <div :class="classes.content">
            <slot>

            </slot>
        </div>
    </div>
</template>


<script setup>
import { computed } from 'vue';
import makeClasses from '@/helpers/makeClasses';

// META


const props = defineProps({

});


// CLASSES

const useClasses = makeClasses(() => ({
    root: ({ themeSettings }) => [themeSettings?.root,
        'flex'
    ],
    content: 'ml-5 sm:ml-2'
}));

const classes = computed(() => {
    return useClasses({
        themeSettings: props.themeSettings
    });
});
</script>
