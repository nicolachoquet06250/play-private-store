<template>
    <ion-app>
        <ion-content id="show-app">
            <ion-grid>
                <ion-row>
                    <div>       
                        <div class="app-icon" 
                             :style="{
                                 '--icon': `url(${app.logo})`
                             }"></div>
                    </div>

                    <div>
                        <h1 style="font-size: 15px; margin-left: 15px; margin-top: 0;">
                            {{ app.name }}
                        </h1>

                        <span style="margin-left: 15px;"> {{ guest.firstname }} {{ guest.lastname }} </span>
                    </div>
                </ion-row>

                <ion-row>
                    <ion-col style="display: flex; justify-content: center; align-items: center;">
                        <span>{{ app.stars }} <ion-icon name="star"></ion-icon></span>
                    </ion-col>
                    
                    <ion-col>
                        <ion-button color="primary" size="small">Installer</ion-button>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-app>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useApp, useGuest } from '@/hooks';

const $route = useRoute();
const appId = computed(() => parseInt($route.params.appId));
const { app } = useApp(appId.value);
const { user } = useGuest();

const guest = user(app.value.author);
</script>

<style lang="scss" scoped>
#show-app {
    margin-top: 15px;
}

.app-icon {
    border: 1px solid black; 
    width: 100px; 
    height: 100px; 
    border-radius: 10px;
    background-image: var(--icon, none);
    background-color: white;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    background-attachment: inherit;
}
</style>