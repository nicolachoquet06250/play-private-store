<template>
    <ion-app>
        <ion-content id="account">
            <ion-card>
                <ion-card-header>
                    <ion-card-title>
                        {{ __('pages.account.title', 'Mon compte') }}
                    </ion-card-title>
                </ion-card-header>

                <ion-card-content>
                    <form>
                        <ion-grid>
                            <ion-row>
                                <ion-col>
                                    <ion-item>
                                        <ion-label position="floating">
                                            {{ __('pages.account.FIRSTNAME', 'PRENOM') }}
                                        </ion-label>

                                        <ion-input type="text" :value="user.firstname" 
                                                    @input="user.firstname = $event.target.value ?? ''"></ion-input>
                                    </ion-item>
                                </ion-col>

                                <ion-col>
                                    <ion-item>
                                        <ion-label position="floating">
                                            {{ __('pages.account.LASTNAME', 'NOM') }}
                                        </ion-label>

                                        <ion-input type="text" :value="user.lastname" 
                                                    @input="user.lastname = $event.target.value ?? ''"></ion-input>
                                    </ion-item>
                                </ion-col>
                            </ion-row>

                            <ion-row>
                                <ion-col>
                                    <ion-item>
                                        <ion-label position="floating">
                                            {{ __('pages.account.EMAIL', 'EMAIL') }}
                                        </ion-label>

                                        <ion-input type="email" :value="user.email" 
                                                    @input="user.email = $event.target.value ?? ''"></ion-input>
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

                                        <ion-input type="text" :value="user.repo_pseudo[GITHUB] ?? ''" 
                                                    @input="user.repo_pseudo[GITHUB] = $event.target.value ?? ''"></ion-input>
                                    </ion-item>
                                </ion-col>

                                <ion-col :style="{ display: (currentTab === GITLAB ? 'block' : 'none') }">
                                    <ion-item>
                                        <ion-label position="floating">
                                            {{ __('pages.account.GITLAB_PSEUDO', 'PSEUDO GITLAB') }}
                                        </ion-label>

                                        <ion-input type="text" :value="user.repo_pseudo[GITLAB] ?? ''" 
                                                    @input="user.repo_pseudo[GITLAB] = $event.target.value ?? ''"></ion-input>
                                    </ion-item>
                                </ion-col>
                            </ion-row>

                            <ion-row>
                                <ion-col>
                                    <ion-title>
                                        {{ __('pages.account.update_title_password', 'Modifier mon mot de passe') }}
                                    </ion-title>
                                </ion-col>
                            </ion-row>

                            <ion-row>
                                <ion-col>
                                    <ion-item>
                                        <ion-label position="floating">
                                            {{ __('pages.account.NEW_PASSWORD', 'NOUVEAU MOT DE PASSE') }}
                                        </ion-label>

                                        <ion-input type="password" 
                                                    :value="password" 
                                                    @input="password = $event.target.value ?? ''" 
                                                    @keyup="$event.target.value === '' ? (password = '') : null"></ion-input>
                                    </ion-item>
                                </ion-col>
                            </ion-row>

                            <ion-row>
                                <ion-col>
                                    <ion-item>
                                        <ion-label position="floating">
                                            {{ __('pages.account.VERIFICATED_PASSWORD', 'VERIFIER LE MOT DE PASSE') }}
                                        </ion-label>

                                        <ion-input type="password" 
                                                    :value="verificatedPassword" 
                                                    @input="verificatedPassword = $event.target.value ?? ''" 
                                                    @keyup="$event.target.value === '' ? (verificatedPassword = '') : null"></ion-input>
                                    </ion-item>
                                </ion-col>
                            </ion-row>
                            
                            <ion-row v-if="error">
                                <div class="alert alert-error">
                                    {{ error }}
                                </div>
                            </ion-row>
                            
                            <ion-row v-if="success">
                                <div class="alert alert-success">
                                    {{ success }}
                                </div>
                            </ion-row>
                        </ion-grid>
                    </form>
                </ion-card-content>
            </ion-card>
        </ion-content>

        <ion-footer style="height: 50px;">
            <CancelButton id="footer-cancel-signin-button" 
                            @click="cancelAccount" />

            <ValidateButton id="footer-validate-signin-button" 
                            @click="updateAccount" />
        </ion-footer>
    </ion-app>
</template>

<script setup>
import { CancelButton, ValidateButton } from '@/components';
import { ref, reactive } from 'vue';
import { useSearchbar, useRepos, useGuest, useTranslate } from '@/hooks';

/**********************************************************/
/** APPEL DES HOOKS ***************************************/
/**********************************************************/

const { hide } = useSearchbar();
const { GITLAB, GITHUB } = useRepos();
const { guest, update } = useGuest();
const { __ } = useTranslate();

/**********************************************************/
/** APPEL DES SOUS HOOKS **********************************/
/**********************************************************/

hide();

/**********************************************************/
/** DEFINITION DES VARIABLES REACTIVES ********************/
/**********************************************************/

const currentTab = ref(GITHUB);
const password = ref('');
const verificatedPassword = ref('');
const error = ref('');
const success = ref('');

const user = reactive({
    firstname: guest.value.firstname,
    lastname: guest.value.lastname,
    email: guest.value.email,
    repo_pseudo: {
        [GITHUB]: guest.value.repo_pseudo[GITHUB] ?? '',
        [GITLAB]: guest.value.repo_pseudo[GITLAB] ?? ''
    }
});

/**********************************************************/
/** DEFINITIONS DES FONCTIONS *****************************/
/**********************************************************/

const createError = (_error, timeout) => {
    success.value = '';
    error.value = _error;

    setTimeout(() => {
        error.value = '';
    }, timeout);
};
const createSuccess = (_success, timeout) => {
    success.value = _success;
    error.value = '';

    setTimeout(() => {
        success.value = '';
    }, timeout);
}

const segmentChanged = v => {
    currentTab.value = v;
};

const cancelAccount = () => {
    password.value = '';
    verificatedPassword.value = '';
};
const updateAccount = () => {
    if (password.value === '' && verificatedPassword.value === '') {
        update(guest.value.id, user);
        createSuccess(__('pages.account.success_message', 'Vos données ont été modifié avec succès.'), 2000);
        cancelAccount();
    } else if (password.value !== verificatedPassword.value) {
        createError(__('pages.account.error_message', 'Les mot de passes ne correspondent pas.'), 2000);
    } else {
        update(guest.value.id, { ...user, password: password.value });
        createSuccess(__('pages.account.success_message', 'Vos données ont été modifié avec succès.'), 2000);
        cancelAccount();
    }
};
</script>

<style>
#main {
    padding-top: 65px;
}
#account ion-scroll > .scroll-inner {
    min-height: auto;
}
</style>

<style lang="scss" scoped>
.alert {
    padding: 15px;
    border: 1px solid;
    border-radius: 5px;
    width: 100%;
    margin-top: 10px;
    color: white;

    &-success {
        border-color: green;
        background: green;
    }

    &-error {
        border-color: red;
        background: red;
    }
}
</style>