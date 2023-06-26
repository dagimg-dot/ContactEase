<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'

defineProps<{
    title?: string
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', modelValue: boolean): void
}>()
</script>

<template>
    <VueFinalModal class="flex items-start justify-center"
        content-class="flex flex-col mt-12 p-4 text-red-800 rounded-lg border border-blue-300 shadow-lg bg-white "
        @update:model-value="val => emit('update:modelValue', val)">
        <div class="flex items-center justify-between">
            <h3 v-if="title" class="text-2xl ">
                {{ title }}
            </h3>
            <ClientOnly>
                <button class="ml-auto" @click="emit('update:modelValue', false)">
                    <div class="bg-white rounded-full">
                        <CloseIcon class="cursor-pointer " />
                    </div>
                </button>
            </ClientOnly>
        </div>
        <slot />
    </VueFinalModal>
</template>

<style scoped>
</style>