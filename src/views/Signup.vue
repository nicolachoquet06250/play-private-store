<template>
    <ion-app>
        <ion-content id="signup">
            <ion-card>
                <ion-card-header>
                    <ion-card-title>Inscription</ion-card-title>
                </ion-card-header>

                <ion-card-content>
                    <form>
                        <ion-grid>
                            <ion-row>
                                <ion-col>
                                    <ion-item>
                                        <ion-label position="floating"> Prénom </ion-label>

                                        <ion-input :value="createdUser.firstname" @input="createdUser.firstname = $event.target.value ?? ''"></ion-input>
                                    </ion-item>
                                </ion-col>

                                <ion-col>
                                    <ion-item>
                                        <ion-label position="floating"> Nom </ion-label>

                                        <ion-input :value="createdUser.lastname" @input="createdUser.lastname = $event.target.value ?? ''"></ion-input>
                                    </ion-item>
                                </ion-col>
                            </ion-row>

                            <ion-row>
                                <ion-col>
                                    <ion-item>
                                        <ion-label position="floating"> Email </ion-label>

                                        <ion-input type="email" :value="createdUser.email" @input="createdUser.email = $event.target.value ?? ''"></ion-input>
                                    </ion-item>
                                </ion-col>
                            </ion-row>

                            <ion-row>
                                <ion-col>
                                    <ion-item>
                                        <ion-label position="floating"> Mot de passe </ion-label>

                                        <ion-input type="password" :value="createdUser.password" @input="createdUser.password = $event.target.value ?? ''"></ion-input>
                                    </ion-item>
                                </ion-col>

                                <ion-col>
                                    <ion-item>
                                        <ion-label position="floating"> Validation du mot de passe </ion-label>

                                        <ion-input type="password" :value="createdUser.validatedPassword" @input="createdUser.validatedPassword = $event.target.value ?? ''"></ion-input>
                                    </ion-item>
                                </ion-col>
                            </ion-row>

                            <ion-row>
                                <ion-col>
                                    <ion-button size="default"> Annuler </ion-button>
                                </ion-col>

                                <ion-col>
                                    <ion-button size="default" @click="signUp"> S'inscrire </ion-button>
                                </ion-col>
                            </ion-row>
                        </ion-grid>
                    </form>
                </ion-card-content>
            </ion-card>
        </ion-content>

        <ion-footer>

        </ion-footer>
    </ion-app>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useSearchbar } from '@/hooks';

const $router = useRouter();
const { hide } = useSearchbar();

hide();

const createdUser = reactive({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    validatedPassword: ''
});

const signUp = () => {
    console.log(createdUser);

    $router.push({ name: 'Signin' });
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