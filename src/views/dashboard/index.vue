<template>
    <div>
        <div class="flex -mt-12 -mx-12 mb-[50px] md:flex-col">
            <div class="px-12 mt-12 mx-auto">
                <div
                    class="sticky top-4 drop-shadow-[0_0_15px_rgba(0,_0,_0,_0.25)]"
                >
                    <HexHead
                        address="0xA105440e9B0C5A5420954746A9d98c9F7C6580F8"
                        size="xl"
                    />
                </div>
            </div>
            <div class="flex flex-col flex-grow px-12 mt-12">
                <div class="text-xxl mb-6">

                </div>
                <div class="mb-8">
                    <div class="text-lg mb-2">
                        Your Profile
                    </div>
                    <div class="text-md space-y-3">
                        <div>
                            Journey started: <span class="text-primary-500">13 days ago</span>
                        </div>
                        <div class="flex justify-between">
                            <div>
                                Your avatar: <span class="text-primary-500"> Mr. Tears</span>
                            </div>
                            <ActionLink theme="secondary">Manage</ActionLink>
                        </div>
                        <div class="flex justify-between">
                            <div>
                                HexHeads owned: <span class="text-primary-500">2 Observer + 4 Prime</span>
                            </div>
                            <ActionLink theme="secondary">View</ActionLink>
                        </div>
                        <div class="flex justify-between">
                            <div>
                                Best offer: <span class="text-primary-500">1 ETH for Mr. Tears</span>
                            </div>
                            <ActionLink theme="secondary">OpenSea</ActionLink>
                        </div>
                    </div>
                </div>
                <div class="mb-8">
                    <div class="text-lg mb-2">
                        DAO Stats
                    </div>
                    <div class="text-md space-y-3">
                        <div>
                            DAO Members: <span class="text-primary-500">12340</span>
                        </div>
                        <div class="flex justify-between">
                            <div>
                                DAO proposals: <span class="text-primary-500">189</span>
                            </div>
                            <ActionLink theme="secondary">Propose</ActionLink>
                        </div>
                        <div class="flex justify-between">
                            <div>
                                Your DAO activity: <span class="text-primary-500">69 Votes</span>
                            </div>
                            <ActionLink theme="secondary">Vote</ActionLink>
                        </div>
                        <div class="flex justify-between">
                            <div>
                                Your Voting Power: <span class="text-primary-500">14</span>
                            </div>
                            <ActionLink theme="secondary">Acquire</ActionLink>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="text-lg mb-2">
                        Collection Stats
                    </div>
                    <div class="text-md space-y-3">
                        <div class="flex justify-between">
                            <div>
                                Community members: <span class="text-primary-500">45901</span>
                            </div>
                            <ActionLink theme="secondary">Discord</ActionLink>
                        </div>
                        <div class="flex justify-between">
                            <div>
                                Observer floor: <span class="text-primary-500">0.08 Eth</span>
                            </div>
                            <div>
                                <ActionLink theme="secondary">OpenSea</ActionLink> / <ActionLink theme="secondary">LooksRare</ActionLink>
                            </div>
                        </div>
                        <div class="flex justify-between">
                            <div>
                                Prime floor: <span class="text-primary-500">0.95 Eth</span>
                            </div>
                            <div>
                                <ActionLink theme="secondary">OpenSea</ActionLink> / <ActionLink theme="secondary">LooksRare</ActionLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class="text-xxl mb-10">
                Your Collection
            </div>
            <div class="flex flex-wrap -mx-3 -mt-10">
                <div
                    v-for="item in 7"
                    :key="item"
                    class="px-3 mt-10 w-1/4 md:w-1/2 sm:w-full"
                >
                    <CollectionCard
                        class="w-full"
                        address="0xA105440e9B0C5A5420954746A9d98c9F7C6580F8"
                        title="Mr. Tears"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import HexHead from '@/components/HexHead/HexHead';
import CollectionCard from '@/components/CollectionCard/CollectionCard';
import ActionLink from '@/components/ActionLink/ActionLink';
import { store } from '@/store';

// const addressOrName = computed(() => store.getters['wallet/addressOrName']);
</script>
