<template>
    <ion-icon name="star" :size="size" 
              v-for="i of Array.from(Array(parseInt(note)).keys())" :key="i"></ion-icon>

    <template v-if="parseInt(note) < parseFloat(note)">
        <ion-icon name="star-half" :size="size"></ion-icon>
        
        <ion-icon name="star-outline" :size="size" 
                  v-for="i of Array.from(Array(5 - parseInt(note) - 1).keys())" :key="i"></ion-icon>
    </template>

    <template v-else>
        <ion-icon name="star-outline" :size="size" 
                  v-for="i of Array.from(Array(5 - parseInt(note)).keys())" :key="i"></ion-icon>
    </template>
</template>

<script setup>
    import { defineProps } from 'vue';

    defineProps({
        note: {
            type: Number
        },
        size: {
            //type: String,
            default: 'small'
        }
    });
</script>