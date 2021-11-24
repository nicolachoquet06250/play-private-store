<template>
    <ion-app>
        <ion-content id="app-list">
            <ion-grid>
                <ion-row>
                    <template v-if="list.length > 0">
                        <ion-col style="max-width: 125px;" 
                            v-for="app of list" :key="app.id">
                            <router-link :to="{ name: 'ShowApp', params: { appId: app.id } }" 
                                         style="height: 100%; display: inline-block;">
                                <div class="app-icon" 
                                     :style="{ '--icon': `url(${app.logo})` }"></div>

                                <div style="display: flex; flex-direction: column; justify-content: space-between; height: calc(100% - 90px);">
                                    <div style="text-align: left; padding-top: 5px;"> 
                                        {{ app.name }}
                                    </div>

                                    <div style="text-align: left; padding-left: 0; display: flex;">
                                        <div style="display: flex; justify-content: center; align-items: center;">
                                            <Stars :note="app.stars" size="small" />
                                        </div>

                                        <template v-if="guest !== null && guest.id === app.author">
                                            <div style="display: flex; justify-content: center; align-items: center;">
                                                <ion-icon name="person"></ion-icon>
                                            </div>
                                        </template>
                                    </div>
                                </div>
                            </router-link>
                        </ion-col>
                    </template>
                    
                    <template v-else>
                        <ion-col>
                            <ion-fab-button @click="$router.push({ name: 'CreateApp' })">
                                <ion-icon name="add"></ion-icon>
                            </ion-fab-button>

                            <ion-text style="font-size: 20px; top: 70px; position: absolute;">
                                Vous n'avez enregistré encore aucune application.
                            </ion-text>
                        </ion-col>
                    </template>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-app>
</template>

<script setup>
import Stars from '@/components/Stars.vue';
import { defineProps, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useApps, useGuest, useSearchbar } from '@/hooks';

const props = defineProps({
    mine: {
        default: false
    }
});

const $router = useRouter();
const { list: globalList, myList } = useApps();
const { guest } = useGuest();
const { show } = useSearchbar();

show();

const list = computed(() => props.mine ? myList.value : globalList.value);
</script>

<style lang="scss">
    #app-list {
        ion-col a {
            text-decoration: none;

            div, &:hover div {
                color: black;
            }

            &:hover div {
                opacity: .8;
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
        }
    }
</style>