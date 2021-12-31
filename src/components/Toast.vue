<template>
    <ion-toast
        :is-open="toast.opened"
        :message="toast.message"
        :duration="toast.duration"
    ></ion-toast>
</template>

<script setup>
import { IonToast } from '@ionic/vue';
import { useToast } from '@/hooks';

/**********************************************************/
/** APPEL DES HOOKS ***************************************/
/**********************************************************/

const { toast } = useToast();
</script>
