<script setup>
import { useModal } from 'vue-final-modal'
import Modal from './Modal.vue'

const { open } = useModal({
    component: Modal,
    attrs: {
        title: 'Hello World!',
    },
    slots: {
        default: '<p>The content of the modal</p>',
    },
})
</script>

<template>
    <button @click="() => open()">
        <!-- Open Modal -->
    </button>
</template>