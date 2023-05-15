<template>
    <div :class="classes.root">
        <div :class="classes.main">
            <p
                v-if="title && !error"
                :class="classes.title"
            >
                {{ title }}
            </p>
            <p
                v-if="error"
                :class="classes.error"
            >
                {{ error }}
            </p>
            <div
                ref="el"
                :class="classes.fieldWrapper"
                @click="onClick"
            >
                <p
                    v-if="placeholder && isFloatingPlaceholder"
                    :class="classes.placeholder"
                >
                    {{ placeholder }}
                </p>
                <input
                    v-if="view !== 'textarea'"
                    ref="input"
                    v-model="value"
                    :class="classes.field"
                    v-maska:[maskTokens]
                    :data-maska="mask"
                    type="text"
                    :placeholder="!isFloatingPlaceholder ? placeholder : ''"
                    :maxlength="maxlength"
                    @focus="onFocus"
                    @blur="onBlur"
                >
                <textarea
                    v-else
                    ref="input"
                    v-model="value"
                    :class="classes.field"
                    v-maska:[maskTokens]
                    :data-maska="mask"
                    type="text"
                    :maxlength="maxlength"
                    @focus="onFocus"
                    @blur="onBlur"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import makeClasses from '@/helpers/makeClasses';


// META

// mask?: 'N' | 'L'
const props = defineProps({
    modelValue: {
        type: String,
    },
    placeholder: {
        type: String
    },
    mask: {
        type: String
    },
    title: {
        type: String
    },
    size: {
        type: String,
        default: 'md'
    },
    view: {
        type: String,
        default: 'floating-placeholder'
    },
    maxlength: {
        type: [Number, String]
    },
    max: {
        type: [Number, String]
    },
    error: {
        type: String
    },
    themeSettings: {
        type: Object
    }
});


const emit = defineEmits([
    'update:modelValue',
    'button-click'
]);


// CLASSES

const useClasses = makeClasses(() => {
    return {
        root: ({ themeSettings }) => [themeSettings?.root,
            'relative'
        ],
        fieldWrapper: ({ isFilled, isFocus, hasError, disabled, size, view }) => {
            const states = {
                default: !hasError && !isFocus && !disabled,
                defaultFocus: !hasError && isFocus && !disabled,
                filled: !hasError && !isFocus && !disabled && isFilled,
                error: hasError && !isFocus && !disabled,
                errorFocus: hasError && isFocus && !disabled,
                disabled
            };

            return [
                'bg-white px-3 py-2.5 border-2 relative transition-fast group',
                {
                    'border-surface-300 hover:bg-primary-100': states.default,
                    'border-surface-500 border-primary-400': states.defaultFocus,
                    'border-gray-300': states.filled,
                    'border-[#FF0000]': states.error,
                    'border-[#CB101D] ': states.errorFocus,
                    'pointer-events-none border-disabled-dark bg-disabled-light': states.disabled,
                },

                view === 'default' && {
                    'h-[71px]': size === 'md',
                },

                view === 'floating-placeholder' && {
                    'h-[71px]': size === 'md',
                },

                view === 'textarea' && {
                    'h-[96px] sm:h-[88px]': size === 'md',
                }
            ];
        },
        field: ({ isFilled, size, view, disabled }) => {
            return [
                'absolute inset-0 rounded-[4px] transition-fast resize-none bg-transparent text-500',
                {

                    '!text-disabled-text': disabled,

                    'text-200': !isFilled,
                    'text-400': isFilled,
                },

                view === 'default' && [
                    'px-[15px]',
                ],

                view === 'floating-placeholder' && [
                    'px-[21px] pt-[5px]',
                    {
                        'pt-[14px]': isFilled
                    }
                ],

                view === 'textarea' && [
                    'p-3'
                ],

                view === 'swap' && [
                    'left-0 top-[13px] w-10/12'
                ],
            ]
        },
        placeholder: ({ isFilled, view, disabled, size }) => {
            return [
                'text-gray-500 absolute z-10 transition-fast pointer-events-none',
                {
                    'text-200': !isFilled,
                    '!text-disabled-text': disabled,
                },

                view === 'floating-placeholder' && {
                    'top-[15px] left-[21px]':!isFilled,
                    'text-400 text-sm top-[5px] left-[21px]': isFilled,
                }
            ]
        },
        title: 'text-md mb-1',
        error: 'text-md mb-1 text-[#FF0000]',
    };
});

const classes = computed(() => {
    return useClasses({
        isFocus: isFocus.value,
        size: props.size,
        view: props.view,
        isFilled: !!value.value.toString(),
        hasError: !!props.error,

        themeSettings: props.themeSettings
    });
});


// FOCUS

const isFocus = ref(false);

function onFocus() {
    isFocus.value = true;
}

function onBlur() {
    isFocus.value = false;
}


// VALUE

const value = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        if (!props.maxlength || value.length <= +props.maxlength ) {
            emit('update:modelValue', value)
        }
    }
});

watch(value, () => {
    if (props.max !== undefined) {
        if (value.value > props.max) {
            value.value = props.max;
        }
    }
});


// INPUT

const input = ref(null);

function onClick() {
    input.value?.focus();
}


// MASKA

const maskTokens = {
    tokens: {
        N: {
            pattern: /[\d]/,
            multiple: true
        },
        L: {
            pattern: /[a-zA-Zа-яА-Я]/,
            multiple: true
        }
    }
};


// FLOATING PLACEHOLDER

const isFloatingPlaceholder = computed(() => props.view === 'floating-placeholder');
</script>
