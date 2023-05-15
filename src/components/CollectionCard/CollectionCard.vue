<template>
    <div
        :class="classes.root"
        @click="emit('click')"
    >
        <div :class="classes.hexWrapper">
            <div :class="classes.hexInner">
                <HexHead
                    :class="classes.hex"
                    :address="address"
                />
            </div>
        </div>
        <div :class="classes.title">
            {{ title }}
        </div>
        <div
            v-if="!isGallery"
            :class="classes.bottom"
        >
            <div>
                Manage
            </div>
            <div>
                Set avatar
            </div>
        </div>
    </div>
</template>


<script setup>
import { computed, defineEmits } from 'vue';
import HexHead from '@/components/HexHead/HexHead';
import makeClasses from '@/helpers/makeClasses';


// META

/**
 * @param address
 * @param 'primary' | 'black' theme
 * @param { root: any, color: any } themeSettings
 */
const props = defineProps({
    address: {
        type: String
    },
    title: {
        type: String
    },
    isGallery: {
        type: Boolean
    },
    themeSettings: {
        type: Object
    }
});

const emit = defineEmits(['click']);


// CLASSES

const useClasses = makeClasses(() => ({
    root: ({ themeSettings, isGallery }) => [themeSettings?.root,
        'group border border-black pt-6 drop-shadow-[0px_0px_15px_rgba(0,0,0,0.25)] bg-white overflow-hidden',
        {
            'pb-6': isGallery
        }
    ],
    hexWrapper: 'px-6 pb-0 w-full',
    hexInner: 'pb-[100%] relative border border-black',
    hex: ({ isGallery }) => [
        'absolute left-0 top-0 h-full pointer-events-none',
        {
            'group-hover:scale-[1.36] transition-fast': isGallery
        }
    ],
    title: 'text-primary-500 text-lg text-center',
    bottom: 'flex justify-between px-6 py-[11px] mt-3 border-t border-black'
}));

const classes = computed(() => {
    return useClasses({
        themeSettings: props.themeSettings,
        isGallery: props.isGallery
    });
});
</script>
