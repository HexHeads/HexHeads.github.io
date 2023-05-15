<template>
    <Notifications
        class="!w-auto"
        position="bottom right"
        :close-on-click="true"
    >
    </Notifications>
</template>


<script setup>
import { computed } from 'vue';
import makeClasses from '@/helpers/makeClasses';

// CLASSES

const useClasses = makeClasses(() => ({
    root: `w-[528px] flex items-center -translate-x-[37px] -translate-y-[47px] py-4 px-4
          rounded-[5px]
          sm:w-[96vw] sm:translate-x-0 sm:-translate-y-4 sm:mx-[2vw] mt-4`,
    main: 'mr-auto',
    icon: 'mr-2',
    cross: 'ml-2',
    title: 'font-bold',
    text: 'text-sm'
}));

const classes = computed(() => {
    return useClasses({
    });
});

</script>

<style>
.vue-notification-wrapper {
    overflow: visible !important;
}
</style>
