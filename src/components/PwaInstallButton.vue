<template>
    <ion-card v-if="deferredPrompt">
        <ion-card-content>
            <ion-grid>
                <ion-row>
                    <ion-col>
                        <h5> Installer l'application sur votre bureau </h5>
                    </ion-col>
                </ion-row>

                <ion-row>
                    <ion-col>
                        <ion-button size="small" @click="install">Installer</ion-button>
                    </ion-col>
                    
                    <ion-col>
                        <ion-button size="small" @click="dismiss">Annuler</ion-button>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-card-content>
    </ion-card>
</template>

<script setup>
import { ref } from 'vue';

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