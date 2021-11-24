<template>
    <div>
        {{ message }}
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useSearchbar } from '@/hooks';

const { show } = useSearchbar();

defineProps({
    message: {
        default: 'Not Found',
    }
})

show();
</script>

<style lang="scss" scoped>

</style>