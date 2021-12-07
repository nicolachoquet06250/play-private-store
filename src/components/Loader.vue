<template>
    <ion-page style="background: red;" v-if="show">
        <div style="height: 100%; display: flex; justify-content: center; align-items: center;">
            <ion-spinner name="crescent"></ion-spinner>
        </div>
    </ion-page>
</template>

<script setup>
    import { useLoader } from '@/hooks';

    const { show } = useLoader();
</script>