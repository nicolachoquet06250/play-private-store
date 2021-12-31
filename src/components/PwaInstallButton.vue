<template>
    <ion-grid id="pwa-scope">
        <ion-row>
            <ion-col>
                <ion-card v-if="deferredPrompt">
                    <ion-card-content>
                        <ion-grid>
                            <ion-row>
                                <ion-col>
                                    <h5> {{ __('pwaInstallationCard.text', `Installer l'application sur votre bureau`) }} </h5>
                                </ion-col>
                            </ion-row>

                            <ion-row>
                                <ion-col>
                                    <ion-button size="small" @click="install">
                                        {{ __('pwaInstallationCard.installButton', `Installer`) }}
                                    </ion-button>
                                </ion-col>
                                
                                <ion-col>
                                    <ion-button size="small" @click="dismiss">
                                        {{ __('pwaInstallationCard.cancelButton', `Annuler`) }}
                                    </ion-button>
                                </ion-col>
                            </ion-row>
                        </ion-grid>
                    </ion-card-content>
                </ion-card>
            </ion-col>
        </ion-row>
        
        <ion-row>
            <ion-col>
                <ion-card v-if="hasNewContent">
                    <ion-card-content>
                        <ion-grid>
                            <ion-row>
                                <ion-col style="display: flex; justify-content: center;">
                                    <span>
                                        {{ __('refreshCard.text', `Des modifications ont été apportés à l'application`) }}
                                    </span>
                                </ion-col>
                            </ion-row>

                            <ion-row>
                                <ion-col style="display: flex; justify-content: center;">
                                    <ion-button size="small" @click="refresh">
                                        {{ __('refreshCard.button', `Recharger`) }}
                                    </ion-button>
                                </ion-col>
                            </ion-row>
                        </ion-grid>
                    </ion-card-content>
                </ion-card>
            </ion-col>
        </ion-row>
    </ion-grid>
</template>

<script setup>
import { ref } from 'vue';
import { useContentUpdate, useTranslate } from '@/hooks';

/**********************************************************/
/** APPEL DES HOOKS ***************************************/
/**********************************************************/

const { hasNewContent, setNewContent } = useContentUpdate();
const { __ } = useTranslate();

/**********************************************************/
/** DEFINITION DES VARIABLES REACTIVES ********************/
/**********************************************************/

const deferredPrompt = ref(null);

/**********************************************************/
/** DEFINITION DES LISTENERS ******************************/
/**********************************************************/

window.addEventListener("beforeinstallprompt", e => {
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt.value = e;
});

window.addEventListener("appinstalled", () => {
    deferredPrompt.value = null;
});

navigator.serviceWorker.addEventListener('controllerchange', () => {
    // This fires when the service worker controlling this page
    // changes, eg a new worker has skipped waiting and become
    // the new active worker.
    console.log('CONTENT CHANGE !!');
    setNewContent(true);
});

/**********************************************************/
/** DEFINITION DES FONCTIONS ******************************/
/**********************************************************/

const dismiss = async () => {
    deferredPrompt.value = null;
};

const install = async () => {
    deferredPrompt.value.prompt();
};

const refresh = () => {
    setNewContent(false);
    window.location.reload()
}
</script>

<style lang="scss">
.pwa-scope {
    .pwa-scope.item.item-md {
        padding-left: 0;

        .item-inner {
            padding: 0;
        }
    }
}
</style>