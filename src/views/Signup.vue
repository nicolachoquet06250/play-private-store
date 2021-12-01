<template>
    <ion-app>
        <ion-content id="signup">
            <ion-card>
                <ion-card-header>
                    <ion-card-title>
                        {{ __('pages.signup.title', 'Inscription') }}
                    </ion-card-title>
                </ion-card-header>

                <ion-card-content>
                    <form>
                        <ion-grid>
                            <ion-row>
                                <ion-col>
                                    <ion-item>
                                        <ion-label position="floating">
                                            {{ __('pages.account.FIRSTNAME', 'Prénom') }}
                                        </ion-label>

                                        <ion-input :value="createdUser.firstname" 
                                                    @input="createdUser.firstname = $event.target.value ?? ''"></ion-input>
                                    </ion-item>
                                </ion-col>

                                <ion-col>
                                    <ion-item>
                                        <ion-label position="floating">
                                            {{ __('pages.account.LASTNAME', 'Nom') }}
                                        </ion-label>

                                        <ion-input :value="createdUser.lastname" 
                                                    @input="createdUser.lastname = $event.target.value ?? ''"></ion-input>
                                    </ion-item>
                                </ion-col>
                            </ion-row>

                            <ion-row>
                                <ion-col>
                                    <ion-item>
                                        <ion-label position="floating">
                                            {{ __('pages.account.EMAIL', 'Email') }}
                                        </ion-label>

                                        <ion-input type="email" :value="createdUser.email" 
                                                    @input="createdUser.email = $event.target.value ?? ''"></ion-input>
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
                                            {{ __('pages.account.GITHUB_PSEUDO', 'PSEUDO GITHUB') }}
                                        </ion-label>

                                        <ion-input type="text" :value="createdUser.repo_pseudo[GITHUB] ?? ''" 
                                                    @input="createdUser.repo_pseudo[GITHUB] = $event.target.value ?? ''"></ion-input>
                                    </ion-item>
                                </ion-col>

                                <ion-col :style="{ display: (currentTab === GITLAB ? 'block' : 'none') }">
                                    <ion-item>
                                        <ion-label position="floating">
                                            {{ __('pages.account.GITLAB_PSEUDO', 'PSEUDO GITLAB') }}
                                        </ion-label>

                                        <ion-input type="text" :value="createdUser.repo_pseudo[GITLAB] ?? ''" 
                                                    @input="createdUser.repo_pseudo[GITLAB] = $event.target.value ?? ''"></ion-input>
                                    </ion-item>
                                </ion-col>
                            </ion-row>

                            <ion-row>
                                <ion-col>
                                    <ion-item>
                                        <ion-label position="floating">
                                            {{ __('pages.account.NEW_PASSWORD', 'Mot de passe') }}
                                        </ion-label>

                                        <ion-input type="password" :value="createdUser.password" 
                                                    @input="createdUser.password = $event.target.value ?? ''"></ion-input>
                                    </ion-item>
                                </ion-col>

                                <ion-col>
                                    <ion-item>
                                        <ion-label position="floating">
                                            {{ __('pages.account.VERIFICATED_PASSWORD', 'Validation du mot de passe') }}
                                        </ion-label>

                                        <ion-input type="password" :value="createdUser.validatedPassword" @input="createdUser.validatedPassword = $event.target.value ?? ''"></ion-input>
                                    </ion-item>
                                </ion-col>
                            </ion-row>
                        </ion-grid>
                    </form>
                </ion-card-content>
            </ion-card>
        </ion-content>

        <ion-footer style="height: 50px;">
            <CancelButton id="footer-cancel-signup-button" @click="cancelSignup" />

            <ValidateButton id="footer-validate-signup-button" @click="signUp" />
        </ion-footer>
    </ion-app>
</template>

<script setup>
import { CancelButton, ValidateButton } from '@/components';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useSearchbar, useTranslate, useRepos } from '@/hooks';

const $router = useRouter();
const { hide } = useSearchbar();
const { __ } = useTranslate();
const { GITLAB, GITHUB } = useRepos();

hide();

const currentTab = ref(GITHUB);
const createdUser = reactive({
    firstname: '',
    lastname: '',
    email: '',
    repo_pseudo: {
        [GITHUB]: '',
        [GITLAB]: ''
    },
    password: '',
    validatedPassword: ''
});

const signUp = () => {
    console.log(createdUser);

    $router.push({ name: 'Signin' });
};

const cancelSignup = () => {
    Object.keys(createdUser).map(k => createdUser[k] = '');
};

const segmentChanged = v => {
    currentTab.value = v;
};
</script>

<style lang="scss">
    #signup {
        ion-scroll {
            .scroll-inner {
                display: flex; 
                justify-content: center; 
                align-items: center;
            }
        }
    }
</style>

<style lang="scss">
#footer-cancel-signup-button,
#footer-validate-signup-button {
    position: absolute;
    bottom: 50%;
    left: calc(50% - 28px);
    right: calc(50% - 28px);

    .fab-button {
        border: 2px solid white;
    }
}

#footer-cancel-signup-button {
    transform: translateX(-100%);
}

#footer-validate-signup-button {
    transform: translateX(100%);
}
</style>