<template>
    <ion-app>
        <ion-content id="create-app">
            <form>
                <ion-grid>
                    <ion-row>
                        <ion-col>
                            <ion-title>
                                {{ __('pages.createApp.appBlocTitle', `Informations sur l'application`) }}
                            </ion-title>
                        </ion-col>
                    </ion-row>
                    
                    <ion-row>
                        <ion-col>
                            <ion-item>
                                <ion-label position="floating">
                                    {{ __('pages.createApp.appName', `Nom de l'appli`) }}
                                </ion-label>

                                <ion-input type="text" :value="form.appName" @input="form.appName = $event.target.value ?? ''"></ion-input>
                            </ion-item>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col>
                            <ion-item>
                                <ion-label position="floating">
                                    {{ __('pages.createApp.logo', 'Logo') }}
                                </ion-label>

                                <ion-input type="text" :value="form.appLogo" @input="form.appLogo = $event.target.value ?? ''"></ion-input>
                            </ion-item>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col>
                            <ion-item>
                                <ion-label position="floating">
                                    {{ __('pages.createApp.description', 'Description') }}
                                </ion-label>

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
                                {{ __('pages.createApp.gitRepoBlocTitle', 'Informations sur le repository git') }}
                            </ion-title>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col>
                            <ion-segment :value="repoType">
                                <ion-segment-button v-if="userUsedRepos.indexOf(GITHUB) !== -1" 
                                                    :value="GITHUB" @click="repoType = GITHUB">
                                    <ion-icon src="https://unpkg.com/ionicons@5.5.2/dist/svg/logo-github.svg"></ion-icon>
                                </ion-segment-button>

                                <ion-segment-button v-if="userUsedRepos.indexOf(GITLAB) !== -1" 
                                                    :value="GITLAB" @click="repoType = GITLAB">
                                    <ion-icon src="https://unpkg.com/ionicons@5.5.2/dist/svg/logo-gitlab.svg"></ion-icon>
                                </ion-segment-button>
                            </ion-segment>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col>
                            <ion-item>
                                <ion-label position="floating"> 
                                    {{ __('pages.createApp.repoName', 'Nom du repository') }}
                                </ion-label>

                                <ion-input type="text" :value="form.repoName" @input="form.repoName = $event.target.value ?? ''"></ion-input>
                            </ion-item>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col>
                            <ion-item>
                                <ion-label position="floating">
                                    {{ __('pages.createApp.repoVersion', 'version du repository') }}
                                </ion-label>

                                <ion-input type="text" :value="form.repoVersion" @input="form.repoVersion = $event.target.value ?? ''"></ion-input>
                            </ion-item>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </form>
        </ion-content>

        <ion-footer style="height: 50px;">
            <ValidateButton id="footer-validate-app-created-button" @click="createApp" />
        </ion-footer>
    </ion-app>
</template>

<script setup>
import { ValidateButton } from '@/components';
import { reactive, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useSearchbar, useApps, useToast, useTranslate, useGuest, useRepos } from '@/hooks';

/**********************************************************/
/** APPEL DES SOUS HOOKS **********************************/
/**********************************************************/

const { hide } = useSearchbar();
const { createApp: saveApp } = useApps();
const { openToast } = useToast();
const { guest, isSignedIn } = useGuest();
const { GITHUB, GITLAB } = useRepos();
const $router = useRouter();
const { __ } = useTranslate();

/**********************************************************/
/** APPEL DES SOUS HOOKS **********************************/
/**********************************************************/

hide();

/**********************************************************/
/** DEFINITION DES VARIABLES REACTIVES ********************/
/**********************************************************/

const repoType = ref(GITHUB);
const userUsedRepos = computed(() => isSignedIn.value ? 
    Object.keys(guest.value.repo_pseudo).reduce((r, c) => 
        guest.value.repo_pseudo[c] !== '' ? [...r, c] : r, []) 
    : []);
const form = reactive({
    appName: '',
    appLogo: '',
    appDescription: '',
    repoName: '',
    repoVersion: ''
});

/**********************************************************/
/** DEFINITION DES FONCTIONS *****************************/
/**********************************************************/

const createApp = () => {
    if (Object.keys(form).reduce((r, c) => form[c] === '' ? true : r, false)) {
        openToast(__('pages.createApp.errorNotAllFieldsFilled', `Vous devez replire tous les champs`), 4000);
        return;
    }

    saveApp(form.repoVersion, repoType.value, form.appName, form.repoName, form.appLogo, form.appDescription, [], [], []);

    $router.push({ name: 'MyApps' })
};
</script>

<style lang="scss" scoped>
#create-app {
    margin-bottom: 40px!important;
}
</style>

<style lang="scss">
#footer-validate-app-created-button {
    position: absolute;
    bottom: 50%;
    left: calc(50% - 28px);
    right: calc(50% - 28px);

    .fab-button {
        border: 2px solid white;
    }
}
</style>