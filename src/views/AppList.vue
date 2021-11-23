<template>
    <ion-app>
        <ion-content id="app-list">
            <ion-grid>
                <ion-col style="width: 110px;" v-for="app of list" :key="app.id">
                    <router-link :to="{ name: 'ShowApp', params: { appId: app.id } }">
                        <div class="app-icon" :style="{ '--icon': `url(${app.logo})` }">
                            <!-- affichgage du logo de l'application -->
                        </div>

                        <div style="text-align: left; padding-top: 5px;"> 
                            {{ app.name }}
                        </div>

                        <div style="text-align: left; padding-left: 5px;">
                            {{ app.stars }} <ion-icon name="star"></ion-icon>
                            <template v-if="guest !== null && guest.id === app.author">
                                <ion-icon name="person"></ion-icon>
                            </template>
                        </div>
                    </router-link>
                </ion-col>
            </ion-grid>
        </ion-content>
    </ion-app>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import { useApps, useGuest } from '@/hooks';

const props = defineProps({
    mine: {
        default: false
    }
});

const { list: globalList, myList } = useApps();
const { guest } = useGuest();

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