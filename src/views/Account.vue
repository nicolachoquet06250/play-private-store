<template>
    <ion-app>
        <ion-content id="account">
            <ion-card>
                <ion-card-header>
                    <ion-card-title> Mon compte </ion-card-title>
                </ion-card-header>

                <ion-card-content>
                    <form>
                        <ion-grid>
                            <ion-row>
                                <ion-col>
                                    <ion-item>
                                        <ion-label position="floating">
                                            PRENOM
                                        </ion-label>

                                        <ion-input type="text"></ion-input>
                                    </ion-item>
                                </ion-col>

                                <ion-col>
                                    <ion-item>
                                        <ion-label position="floating">
                                            NOM
                                        </ion-label>

                                        <ion-input type="text"></ion-input>
                                    </ion-item>
                                </ion-col>
                            </ion-row>

                            <ion-row>
                                <ion-col>
                                    <ion-item>
                                        <ion-label position="floating">
                                            EMAIL
                                        </ion-label>

                                        <ion-input type="email"></ion-input>
                                    </ion-item>
                                </ion-col>
                            </ion-row>

                            <ion-row>
                                <ion-col>
                                    <ion-segment :value="currentTab">
                                        <ion-segment-button :value="GITHUB" @click="segmentChanged(GITHUB)">
                                            <ion-icon src="https://unpkg.com/ionicons@5.5.2/dist/svg/logo-github.svg"></ion-icon>
                                        </ion-segment-button>

                                        <ion-segment-button :value="GITLAB" @click="segmentChanged(GITLAB)">
                                            <ion-icon src="https://unpkg.com/ionicons@5.5.2/dist/svg/logo-gitlab.svg"></ion-icon>
                                        </ion-segment-button>
                                    </ion-segment>
                                </ion-col>
                            </ion-row>

                            <ion-row>
                                <ion-col :style="{ display: (currentTab === GITHUB ? 'block' : 'none') }">
                                    <ion-item>
                                        <ion-label position="floating">
                                            PSEUDO GITHUB
                                        </ion-label>

                                        <ion-input type="text"></ion-input>
                                    </ion-item>
                                </ion-col>

                                <ion-col :style="{ display: (currentTab === GITLAB ? 'block' : 'none') }">
                                    <ion-item>
                                        <ion-label position="floating">
                                            PSEUDO GITLAB
                                        </ion-label>

                                        <ion-input type="text"></ion-input>
                                    </ion-item>
                                </ion-col>
                            </ion-row>

                            <ion-row>
                                <ion-col>
                                    <ion-title>
                                        Modifier mon mot de passe
                                    </ion-title>
                                </ion-col>
                            </ion-row>

                            <ion-row>
                                <ion-col>
                                    <ion-item>
                                        <ion-label position="floating">
                                            NOUVEAU MOT DE PASSE
                                        </ion-label>

                                        <ion-input type="password"></ion-input>
                                    </ion-item>
                                </ion-col>
                            </ion-row>

                            <ion-row>
                                <ion-col>
                                    <ion-item>
                                        <ion-label position="floating">
                                            VERIFIER LE MOT DE PASSE
                                        </ion-label>

                                        <ion-input type="password"></ion-input>
                                    </ion-item>
                                </ion-col>
                            </ion-row>
                        </ion-grid>
                    </form>
                </ion-card-content>
            </ion-card>
        </ion-content>

        <ion-footer style="height: 50px;">
            <CancelButton id="footer-cancel-signin-button" @click="cancelAccount" />

            <ValidateButton id="footer-validate-signin-button" @click="updateAccount" />
        </ion-footer>
    </ion-app>
</template>

<script setup>
import { CancelButton, ValidateButton } from '@/components';
import { ref } from 'vue';
import { useSearchbar, useRepos } from '@/hooks';

const { hide } = useSearchbar();
const { GITLAB, GITHUB } = useRepos();

const currentTab = ref(GITHUB);

hide();

const segmentChanged = v => {
    currentTab.value = v;
};

const cancelAccount = () => {};
const updateAccount = () => {};
</script>

<style>
#main {
    padding-top: 65px;
}
#account ion-scroll > .scroll-inner {
    min-height: auto;
}
</style>