<template>
    <Component
        :is="componentName"
        ref="root"
        :class="classes.root"
        v-bind="buttonAttrs"
        v-on="$attrs"
        @click="emit('click', $event)"
        @mouseenter="generateDots"
        @mouseleave="clearDots"
    >
        <div v-if="loading" :class="classes.loading"></div>
        <span :class="classes.container">
            <span :class="classes.bg"></span>
            <TransitionGroup
                name="fade"
                ta="span"
                :class="classes.dots"
            >
                <span
                    v-for="(dot, index) in dots"
                    :key="index"
                    :class="classes.dot"
                    :style="`transform: scale(${ dot.size }); left: ${dot.left}%; top: ${dot.top}%`"
                >
                </span>
            </TransitionGroup>
            <span
                v-if="hasContent"
                :class="classes.content"
            >
                <slot></slot>
            </span>
            <slot
                v-else
                v-bind="{class: classes.content}"
            ></slot>
        </span>
        <div>

        </div>
    </Component>
</template>

<script setup>
import { computed, useSlots, ref, onMounted } from 'vue';
import makeClasses from '@/helpers/makeClasses';


// META

const props = defineProps({
    href: String,
    disabled: String,
    type: {
        type: String,
        default: 'button'
    },
    theme: {
        type: String,
        default: 'primary'
    },
    size: {
        type: String
    },
    view: {
        type: String,
        default: 'outlined'
    },
    themeSettings: String,
    loading: String
});

const slots = useSlots();

const emit = defineEmits(['click']);


// CLASSES

const useClasses = makeClasses(() => ({
    root: ({size, themeSettings, view, theme, disabled, loading}) => [themeSettings?.root,
        'group inline-flex justify-center items-center relative z-1 [background-position-y:0] overflow-hidden',

        themeSettings?.size || {
            'h-[71px]': size === 'xl'
        },

        {

            'px-5 text-lg': size === 'xl',

            '!text-disabled-text pointer-events-none': disabled,
            'pointer-events-none': loading
        },

        themeSettings?.textColor || [
            view === 'filled' && {
            },


            view === 'outlined' && {
                'text-primary-500 hover:text-black': theme === 'primary'
            },

            view === 'ghost' && {
            }
        ]
    ],
    container: ({themeSettings}) => [themeSettings?.container,
        'flex justify-center items-center transition-fast'
    ],
    bg: ({view, theme, rounded, themeSettings}) => [themeSettings?.bg,
        'absolute inset-0 -z-1 transition-fast',
        {

            'rounded-[5px]': rounded === 'sm',
            'rounded-[30px]': rounded === 'lg',
            'rounded-full': rounded === 'full'
        },

        themeSettings?.bgOrBorder || [
            view === 'filled' && {
            },

            view === 'outlined' && {
                'border-black border-2 group-hover:border-primary-100': theme === 'primary'
            },

            view === 'ghost' && {
            },
        ]
    ],
    dots: ({view, theme, rounded, themeSettings}) => [
        'absolute inset-0 z-[-100] transition-fast'
    ],
    dot: ({ size }) => [
        'absolute block bg-primary-500',
        {
            'w-[8px] h-[8px]': size === 'xl',
            'w-[5px] h-[5px]': !size
        }
    ],
    content: ({size}) => [
        'z-10',
        {
            'leading-[0.8]': size === 'xl'
        }
    ],
    loading: '-preloader-dots z-50'
}));

const hasContent = computed(() => {
    return !!slots.default;
});

const classes = computed(() => {
    return useClasses({
        size: props.size,
        theme: props.theme,
        view: props.view,
        disabled: props.disabled,
        hasContent: !!hasContent.value,
        loading: props.loading,
        themeSettings: props.themeSettings
    });
});


// COMPONENT NAME

const componentName = computed(() => {
    if (typeof props.href === 'object' || (typeof props.href === 'string' && /^\//.test(props.href))) {
        return 'RouterLink';
    } else if (typeof props.href === 'string' && !/^\//.test(props.href)) {
        return 'a';
    } else if (props.type === 'label') {
        return 'label';
    }

    return 'button';
});


// BUTTON ATTRS

const buttonAttrs = computed(() => {
    if (componentName.value === 'button' && (props.type === 'button' || props.type === 'submit')) {
        return {
            disabled: props.disabled,
            type: props.type
        };
    } else if (componentName.value === 'RouterLink') {
        return {
            to: props.href
        };
    } else if (componentName.value === 'a') {
        return {
            href: typeof props.href === 'string' ? props.href : '',
            target: '_blank'
        };
    } else if (componentName.value === 'label') {
        return {};
    }

    return null;
});


// ROOT

const root = ref(null);

defineExpose({
    root
});


// DOTS

const dots = ref([]);

let int = null;

function generateDots() {
    int = setInterval(() => {
        const size = Math.random();

        dots.value.push({
            size: Math.random(),
            left: Math.floor(Math.random() * 96) + 2,
            top: Math.floor(Math.random() * 60) + 20
        });

        setTimeout(() => {
            const index = dots.value.find(item => item.size === size);

            dots.value.splice(index, 1);
        }, 600)
    },100)
}

function clearDots() {
    clearInterval(int);
    dots.value = [];
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
}
.fade-enter-from, .fade-leave-to  {
    opacity: 0;
}
</style>
