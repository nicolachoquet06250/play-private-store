<template>
    <ion-app>
        <ion-content id="create-app">
            <form>
                <ion-grid>
                    <ion-row>
                        <ion-col>
                            <ion-title>
                                Informations sur l'application
                            </ion-title>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col>
                            <ion-item>
                                <ion-label position="floating"> Nom de l'appli </ion-label>

                                <ion-input></ion-input>
                            </ion-item>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col>
                            <ion-item>
                                <ion-label position="floating"> Logo </ion-label>

                                <ion-input></ion-input>
                            </ion-item>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col>
                            <ion-item>
                                <ion-label position="floating"> Description </ion-label>

                                <ion-textarea></ion-textarea>
                            </ion-item>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col> <hr /> </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col>
                            <ion-title>
                                Informations sur le repository git
                            </ion-title>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col>
                            <ion-item>
                                <ion-label position="floating"> Nom du repository </ion-label>

                                <ion-input></ion-input>
                            </ion-item>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col>
                            <ion-item>
                                <ion-label position="floating"> version du repository </ion-label>

                                <ion-input></ion-input>
                            </ion-item>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </form>
        </ion-content>
    </ion-app>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useSearchbar, useGuest } from '@/hooks';

const $router = useRouter();
const { hide } = useSearchbar();
const { guest } = useGuest();

if (guest.value === null) {
    $router.push({ name: 'AppList' });
}

hide();

</script>

<style lang="scss" scoped>
    
</style>