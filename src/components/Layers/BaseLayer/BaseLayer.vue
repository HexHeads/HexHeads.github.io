<template>
    <div :class="classes.root">
        <div
            :class="classes.wrapper"
            @click.self="closeLayer"
            @mousedown.self="mouseDown = true"
        >
            <div
                :class="[containerStyles, classes.container]"
                @click="mouseDown = false"
            >
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import useLayer from '@/composables/useLayer';
import makeClasses from '@/helpers/makeClasses';


// META

const props = defineProps({
    id: {
        type: Number
    },
    containerStyles: {
        type: String
    },
    position: {
        type: String,
        default: 'center'
    },
    closeOnClickOutside: {
        type: Boolean,
        default: true
    },
    themeSettings: {
        type: Object
    }
});

const { close } = useLayer();


// CLASSES

const useClasses = makeClasses(() => ({
    root: () => [
        'fixed inset-0 min-h-screen z-[9998] overflow-x-hidden overflow-y-auto'
    ],
    wrapper: ({ position }) => [
        'min-h-screen',
        {
            'flex items-center justify-center': position === 'center',
            'flex justify-end': position === 'right',
            'flex justify-start': position === 'left',
        }
    ],
    container: ({ themeSettings }) => [
        [themeSettings?.container, 'bg-white relative']
    ]

}));

const classes = computed(() => {
    return useClasses({
        position: props.position,
        themeSettings: props.themeSettings,
    });
});


// CLOSE LAYER

const mouseDown = ref(false);

function closeLayer() {
    if (props.closeOnClickOutside && mouseDown.value) {
        close(props.id);
    }
}
</script>

<style>
.layer-blackout {
    @apply fixed top-0 left-0 right-0 bottom-0 transition-opacity duration-300 ease-out;
    transform-style: preserve-3d;
    background-color: rgba(24, 51, 79, 0.3);
    backdrop-filter: blur(8px);
    z-index: 9990;
}

.is-layer-locked {
    @apply fixed top-0 bottom-0 w-full pointer-events-none;
}


.fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
    .modal-container {
        transition: opacity .5s;
    }
}
.fade-enter-from, .fade-leave-to  {
    opacity: 0;
    .modal-container {
        opacity: 0;
    }
}

.fade-enter-active .base-animation-layer, .fade-leave-active .base-animation-layer {
    @apply transition-fast;
}
.fade-enter-from .base-animation-layer, .fade-leave-to .base-animation-layer  {
    transform: scale(.95);
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>
