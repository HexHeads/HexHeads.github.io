<template>
    <a
        v-if="!to"
        :class="classes.root"
        v-bind="attrs"
        @click="emit('click')"
    >
        <slot></slot>
    </a>
    <RouterLink
        v-else-if="to"
        :class="classes.root"
        :to="to"
        v-bind="attrs"
        @click="emit('click')"
    >
        <slot></slot>
    </RouterLink>
    <div
        v-else
        :class="classes.root"
        v-bind="attrs"
        @click="emit('click')"
    >
        <slot></slot>
    </div>
</template>


<script setup>
import { computed, useAttrs } from 'vue';
import { RouterLink } from 'vue-router';
import makeClasses from '@/helpers/makeClasses';


// META

/**
 * @param to
 * @param 'primary' | 'black' theme
 * @param { root: any, color: any } themeSettings
 */
const props = defineProps({
    to: {
        type: Object
    },
    theme: {
        type: String,
        default: 'primary'
    },
    underline: {
        type: Boolean,
        default: true
    },
    themeSettings: {
        type: Object
    }
});
const emit = defineEmits(['click']);
const attrs = useAttrs();


// CLASSES

const useClasses = makeClasses(() => ({
    root: ({ themeSettings, theme, underline }) => [themeSettings?.root,
        'transition-fast cursor-pointer',
        underline && ' underline underline-offset-[5px]',
        themeSettings?.color || {
            'text-primary-500 hover:text-primary-500': theme === 'primary',
            'text-secondary-500 hover:text-secondary-500': theme === 'secondary',
            'text-black hover:text-primary-500': theme === 'black'
        }
    ],
}));

const classes = computed(() => {
    return useClasses({
        themeSettings: props.themeSettings,
        theme: props.theme,
        underline: props.underline
    });
});
</script>
