<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script setup>
import { useSearchbar } from '@/hooks';

const { hide } = useSearchbar();

hide();
</script>

<style scoped>
#main {
  padding-top: 0!important;
}
</style>