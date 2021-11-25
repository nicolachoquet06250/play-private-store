<template>
    <div v-if="deferredPrompt">
        <ion-grid>
            <ion-row>
                <ion-col>
                    <ion-button @click="install">Installer</ion-button>
                </ion-col>
            </ion-row>

            <ion-row>
                <ion-col>
                    <ion-button @click="dismiss">Annuler</ion-button>
                </ion-col>
            </ion-row>
        </ion-grid>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import PwaInstallButton from '@/components/PwaInstallButton.vue';

const deferredPrompt = ref(null);

window.addEventListener("beforeinstallprompt", e => {
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt.value = e;
});

window.addEventListener("appinstalled", () => {
    deferredPrompt.value = null;
});

const dismiss = async () => {
    deferredPrompt.value = null;
};

const install = async () => {
    deferredPrompt.value.prompt();
};
</script>