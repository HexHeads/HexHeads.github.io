<template>
    <Transition name="fade">
        <div
            v-if="isBlackoutShown"
            class="layer-blackout"
        >
        </div>
    </Transition>
    <Transition name="fade">
        <Component
            v-if="lastItem"
            :is="lastItem.component"
            :key="lastItem.id"
            v-bind="{
                ...lastItem.props,
                id: lastItem.id
            }"
        />
    </Transition>
</template>

<script setup>
import useLayer from '@/composables/useLayer';
import { computed } from 'vue';


// META

const { isBlackoutShown, openedItems } = useLayer();


// LAST ITEM

const lastItem = computed(() => openedItems.value.at(-1));
</script>
