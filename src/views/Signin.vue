<template>
    <ion-app>
        <ion-content id="signin">
            <ion-card>
                <ion-card-header>
                    <ion-card-title>
                        {{ __('pages.signin.title', 'Connexion') }}
                    </ion-card-title>
                </ion-card-header>

                <ion-card-content>
                    <form>
                        <ion-grid>
                            <ion-row>
                                <ion-col>
                                    <ion-item>
                                        <ion-label position="floating">
                                            {{ __('pages.account.EMAIL', 'Email') }}
                                        </ion-label>

                                        <ion-input type="email" :value="email" @input="email = $event.target.value ?? ''"></ion-input>
                                    </ion-item>
                                </ion-col>
                            </ion-row>

                            <ion-row>
                                <ion-col>
                                    <ion-item>
                                        <ion-label position="floating">
                                            {{ __('pages.signin.password', 'Mot de passe') }}
                                        </ion-label>

                                        <ion-input type="password" :value="password" @input="password = $event.target.value ?? ''"></ion-input>
                                    </ion-item>
                                </ion-col>
                            </ion-row>

                            <ion-row>
                                <ion-col>
                                    <ion-item>
                                        <ion-checkbox color="primary" :value="keepConnect" @change="keepConnect = !keepConnect"></ion-checkbox>

                                        <ion-label>
                                            {{ __('pages.signin.keep_connect', 'Rester connecté') }}
                                        </ion-label>
                                    </ion-item>
                                </ion-col>
                            </ion-row>

                            <ion-row v-if="error">
                                <ion-col>
                                    <div class="alert">
                                        {{ error }}
                                    </div>
                                </ion-col>
                            </ion-row>
                        </ion-grid>
                    </form>
                </ion-card-content>
            </ion-card>
        </ion-content>

        <ion-footer style="height: 50px;">
            <CancelButton id="footer-cancel-signin-button" @click="cancelSignin" />

            <ValidateButton id="footer-validate-signin-button" @click="signIn(email, password, keepConnect, 'Home')" />
        </ion-footer>
    </ion-app>
</template>

<script setup>
import { CancelButton, ValidateButton } from '@/components';
import { ref } from 'vue';
import { useGuest, useSearchbar, useTranslate } from '@/hooks';

/**********************************************************/
/** APPEL DES SOUS HOOKS **********************************/
/**********************************************************/

const { signIn, error } = useGuest();
const { hide } = useSearchbar();
const { __ } = useTranslate();

/**********************************************************/
/** APPEL DES SOUS HOOKS **********************************/
/**********************************************************/

hide();

/**********************************************************/
/** DEFINITION DES VARIABLES REACTIVES ********************/
/**********************************************************/

const email = ref('');
const password = ref('');
const keepConnect = ref(false);

/**********************************************************/
/** DEFINITION DES FONCTIONS *****************************/
/**********************************************************/

const cancelSignin = () => {
    email.value = '';
    password.value = '';
};
</script>

<style lang="scss">
#signin {
    ion-scroll {
        .scroll-inner {
            display: flex; 
            justify-content: center; 
            align-items: center;
        }
    }

    .alert {
        padding: 10px;
        background-color: #AA0000;
        color: white;
        width: 100%;
        border-radius: 5px;
    }
}
</style>

<style lang="scss">
#footer-cancel-signin-button,
#footer-validate-signin-button {
    position: absolute;
    bottom: 50%;
    left: calc(50% - 28px);
    right: calc(50% - 28px);

    .fab-button {
        border: 2px solid white;
    }
}

#footer-cancel-signin-button {
    transform: translateX(-100%);
}

#footer-validate-signin-button {
    transform: translateX(100%);
}
</style>