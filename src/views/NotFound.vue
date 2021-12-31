<template>
    <div>
        {{ message }}
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useSearchbar } from '@/hooks';

/**********************************************************/
/** APPEL DES SOUS HOOKS **********************************/
/**********************************************************/

const { show } = useSearchbar();

/**********************************************************/
/** APPEL DES SOUS HOOKS **********************************/
/**********************************************************/

show();

/**********************************************************/
/** DEFINITION DES PROPS **********************************/
/**********************************************************/

defineProps({
    message: {
        default: 'Not Found',
    }
})

</script>

<style lang="scss" scoped>

</style>