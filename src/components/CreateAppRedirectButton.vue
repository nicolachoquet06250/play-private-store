<template>
    <ion-fab-button @click="$router.push({ name: 'CreateApp' })">
        <ion-icon name="add"></ion-icon>
    </ion-fab-button>
</template>

<script setup>
import { useRouter } from 'vue-router';

/**********************************************************/
/** APPEL DES HOOKS ***************************************/
/**********************************************************/

const $router = useRouter();
</script>