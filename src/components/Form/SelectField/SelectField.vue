<template>
    <div
        ref="main"
        :class="[classes.main, classes.height]"
    >
        <VueSelect
            v-model="value"
            :class="classes.select"
            ref="select"
            :options="options"
            label="title"
            :reduce="(option) => option.id"
            :clearable="false"
            :close-on-select="true"
            :searchable="searchable"
            @open="onOpen"
            v-click-outside="close"
        >
            <template #no-options>
                {{ notFound }}
            </template>
            <template #open-indicator>
                <span :class="classes.openIndicator"></span>
            </template>
            <template #selected-option="{ id, title, icon }">
                <slot name="selected-option" v-bind="{ id, title, icon }">
                    <div :class="[classes.selectedOption, classes.height, classes.padding]">
                        <span
                            v-if="title"
                            :class="classes.title"
                            v-html="title"
                        >
                        </span>
                        <span
                            v-if="!title"
                            :class="classes.placeholder"
                        >
                            {{ placeholder }}
                        </span>
                        <div :class="classes.arrowIcon">
                            \/
                        </div>
                    </div>
                </slot>
            </template>
            <template #option="{ title, id, icon }">
                <slot name="option" v-bind="{ title, id, icon }">
                    <div :class="[classes.option, classes.padding]">
                        <span v-html="title" />
                    </div>
                </slot>
            </template>
            <template #search="{ attributes, events }">
                <div :class="classes.searchWrapper">
                    <input
                        :class="[classes.search, classes.height, classes.padding]"
                        v-bind="attributes"
                        v-on="events"
                    >
                </div>
            </template>
        </VueSelect>
    </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref } from 'vue';
import VueSelect from 'vue-select';
import makeClasses from '@/helpers/makeClasses';


// META

const props = defineProps({
    modelValue: [String, Number],
    placeholder: String,
    notFound: {
        type: String,
        default: 'No data'
    },
    searchable: Boolean,
    options: Array,
    size: {
        type: String,
        default: 'md'
    },
    theme: {
        type: String,
        default: 'white'
    },
    themeSettings: Object
});


const emit = defineEmits(['update:modelValue']);


// COMMON:select

const select = ref(null);

function close(): void {
    select.value.open = false;
}


// CLASSES


const useClasses = makeClasses(() => ({
    root: ({ themeSettings }) => [themeSettings?.root,
    ],
    main: ({ size, isOpen, theme }) => [
        {
            'md:text-xxs': size === 'md',
            'text-sm': size === 'sm',
            'text-xxs': size === 'xs',
            'z-50 relative': isOpen,

            'text-gray-500': theme === 'white',
            'text-gray-600': theme === 'primary'
        }
    ],
    select: ({ theme }) => [
        'overflow-hidden cursor-pointer relative',
        {
            'border border-gray-100 shadow-[0px_4px_24px_rgba(108,108,125,.08)]': theme === 'white',
            'bg-primary-100': theme === 'primary'
        }
    ],
    openIndicator: 'hidden',
    selectedOption: ({ theme }) => [
        'transition-fast flex items-center',
        {
            'bg-white hover:bg-surface-100': theme === 'white',
            'bg-primary-100 hover:bg-primary-200': theme === 'primary'
        }
    ],
    option: ({ theme }) => [
        'py-2 transition-fast flex items-center',
        {
            'bg-white hover:bg-surface-100': theme === 'white',
            'bg-primary-100 hover:bg-primary-200': theme === 'primary'
        }
    ],
    search: 'absolute top-0 left-0 w-10/12 opacity-0 focus:opacity-100',
    arrowIcon: ({ isOpen }) => [
        'ml-auto',
        {
            'rotate-180': isOpen
        }
    ],
    searchWrapper: ({ searchable }) => [
        {
            'hidden': !searchable
        }
    ],
    placeholder: ({ innerLabel }) => [
        'text-200',
        {
            'translate-y-[7px]': !!innerLabel
        }
    ],
    height: ({ size, themeSettings }) => [
        themeSettings?.height || {
            'h-[71px] sm:h-[30px]': size === 'md'
        }
    ],
    padding: ({ size }) => [
        {
            'h-[71px] px-6 sm:px-3': size === 'md'
        }
    ],
}));

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
        themeSettings: props.themeSettings,
        size: props.size,
        hasValue: !!value.value,
        isOpen: !!select?.value?.open,
        searchable: props.searchable,
        theme: props.theme
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


// OPEN

const main = ref();

async function onOpen() {
    await nextTick();
    cropHeight();
}

function cropHeight() {
    if (!main.value) {
        return;
    }

    const list = main.value.querySelector('.vs__dropdown-menu');

    if (!list) {
        return;
    }

    const listCoords = list.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const offset = listCoords.bottom - windowHeight;
    const listHeight = list.offsetHeight;
    const newListHeight = listHeight - offset - 20;

    if (newListHeight > 0) {
        list.style.maxHeight = newListHeight + 'px';
    }
}
</script>
<style lang="postcss">

    .v-select {

        .vs__dropdown-menu {
            overflow-y: auto;
            overflow-x: hidden;
        }

        .vs__dropdown-toggle {
        }

        .vs__selected-options {
        }



        .vs__search {
        }

        .vs__actions {
        }

        .vs__dropdown-option {
        }

        .vs__dropdown-option--selected {
        }

        .vs__selected {
        }
        .vs__deselect {
        }

        input::-ms-clear,
        input::-ms-reveal {
        }
        input::-webkit-search-decoration,
        input::-webkit-search-cancel-button,
        input::-webkit-search-results-button,
        input::-webkit-search-results-decoration {
            display: none;
        }
    }
    .v-select.vs--open {
        .svg-icon {
        }
    }
    .v-select.vs--open.vs--searchable,
    .v-select.vs--fill:not(.vs--open) {
        .vs__search {
        }
    }
    .v-select.vs--loading {
        .vs__clear,
        .vs__open-indicator {
        }
    }

    .vs--multiple {
        .vs__selected {
            display: flex;
            flex-grow: 0;
        }
        .vs__deselect {
            display: block;
            margin-left: 8px;
        }
    }
</style>
