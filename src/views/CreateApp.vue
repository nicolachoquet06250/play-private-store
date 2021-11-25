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
                            <ion-button @click="createApp"> Valider </ion-button>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </form>
        </ion-content>
    </ion-app>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useSearchbar, useApps, useToast } from '@/hooks';

const { hide } = useSearchbar();
const { createApp: saveApp } = useApps();
const { openToast } = useToast();
const $router = useRouter();

hide();

const form = reactive({
    appName: '',
    appLogo: '',
    appDescription: '',
    repoName: '',
    repoVersion: ''
});

const createApp = () => {
    if (Object.keys(form).reduce((r, c) => form[c] === '' ? true : r, false)) {
        openToast(`Vous devez replire tous les champs`, 4000);
        return;
    }

    saveApp(form.repoVersion, form.appName, form.repoName, form.appLogo, form.appDescription, [], [], []);

    $router.push({ name: 'MyApps' })
};

</script>

<style lang="scss" scoped>
    
</style>