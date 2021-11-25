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

                                <ion-input type="text" :value="form.appName" @input="form.appName = $event.target.value ?? ''"></ion-input>
                            </ion-item>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col>
                            <ion-item>
                                <ion-label position="floating"> Logo </ion-label>

                                <ion-input type="text" :value="form.appLogo" @input="form.appLogo = $event.target.value ?? ''"></ion-input>
                            </ion-item>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col>
                            <ion-item>
                                <ion-label position="floating"> Description </ion-label>

                                <ion-textarea type="text" :value="form.appDescription" @input="form.appDescription = $event.target.value ?? ''"></ion-textarea>
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

                                <ion-input type="text" :value="form.repoName" @input="form.repoName = $event.target.value ?? ''"></ion-input>
                            </ion-item>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col>
                            <ion-item>
                                <ion-label position="floating"> version du repository </ion-label>

                                <ion-input type="text" :value="form.repoVersion" @input="form.repoVersion = $event.target.value ?? ''"></ion-input>
                            </ion-item>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col>
                            <ion-button @click="createApp(form.repoVersion, form.appName, form.repoName, form.appLogo, form.appDescription, [], [], [])"> Valider </ion-button>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </form>
        </ion-content>
    </ion-app>
</template>

<script setup>
import { reactive } from 'vue';
import { useSearchbar, useApps, useToast } from '@/hooks';

const { hide } = useSearchbar();
const { createApp } = useApps();
const { setOpened, setMessage } = useToast();

setTimeout(() => {
    setMessage(`c'est un test`);
    setOpened(true);
}, 5000);

hide();

const form = reactive({
    appName: '',
    appLogo: '',
    appDescription: '',
    repoName: '',
    repoVersion: ''
});

</script>

<style lang="scss" scoped>
    
</style>