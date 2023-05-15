<template>
    <div
        :class="classes.root"
        @click="emit('click', $event)"
    >
        <div :class="classes.row"></div>
        <div :class="classes.row"></div>
    </div>
</template>


<script setup>
import { computed } from 'vue';
//import  from '@/components/';
import makeClasses from '@/helpers/makeClasses';

// META

const props = defineProps({

});

const emit = defineEmits(['click']);


// CLASSES

const useClasses = makeClasses(() => ({
    root: ({ themeSettings }) => [themeSettings?.root,
        'w-[40px] h-[40px] flex flex-col justify-center border-2 border-black'
    ],
    row: ({ themeSettings }) => [themeSettings?.row,
        'h-[2px] w-[30px] bg-black mx-auto last:-mt-0.5 first:mt-0.5 first:rotate-[45deg] last:rotate-[-45deg]'
    ],
}));

const classes = computed(() => {
    return useClasses({
        themeSettings: props.themeSettings
    });
});
</script>
