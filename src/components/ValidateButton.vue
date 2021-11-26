<template>
    <ion-fab-button @click="$emit('click', $event)">
        <ion-icon name="checkmark"></ion-icon>
    </ion-fab-button>
</template>

<script setup>
import { defineEmits } from 'vue';

defineEmits(['click']);
</script>