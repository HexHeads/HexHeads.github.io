<template>
    <BaseLayer
        class="p-8"
        :class="id"
        :id="id"
        :theme-settings="{
            container: 'p-[54px] w-[1272px] flex flex-col base-animation-layer rounded-[4px] text-center'
        }"
    >
        <p class="text-xl text-left mb-4">
            Choose {{ title }}
        </p>
        <div
            class="flex flex-wrap -mt-4 -mx-2"
        >
            <div
                v-for="(item, index) in items.slice(0, -1)"
                :key="index"
                class="flex w-1/5 mt-4 px-2 md:w-1/4 sm:w-1/2"
            >
                <div
                    class="w-full flex justify-center items-center cursor-pointer"
                    :class="{
                        'border border-black p-4': type !== 'color'
                    }"
                    @click="close(id, item.id)"
                >
                    <div
                        v-if="type !== 'color'"
                        class="h-[32px] w-[32px] bg-no-repeat scale-[1.8]"
                        :style="`background-image:url(${ require(`@/assets/images/hexheads/${ spriteIndex }.png`) });background-position:${ -(index - (Math.floor((index / 16))) * 16) * 32 }px ${ Math.floor((index / 16)) * -32 }px;`"
                    >
                    </div>
                    <div v-else class="w-full h-[66px]" :style="`background-color:${ item.title }`"></div>
                </div>
            </div>
        </div>
    </BaseLayer>
</template>

<script lang="ts" setup>
import useLayer from '@/composables/useLayer';
import BaseLayer from '@/components/Layers/BaseLayer/BaseLayer.vue';


// META

const props =defineProps({
    id: String,
    title: String,
    items: Array,
    type: String,
    spriteIndex: Number
})
const { close } = useLayer();
</script>
