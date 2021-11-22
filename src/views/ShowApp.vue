<template>
    <div>
        Show App <br>
        {{ $route.params.appId }}
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const $route = useRoute();
</script>

<style lang="scss" scoped>

</style>