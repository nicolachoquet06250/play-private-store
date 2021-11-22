<template>
    <ion-app>
        <ion-content id="app-list">
            <ion-grid>
                <ion-col style="width: 110px;" v-for="app of list" :key="app.id">
                    <router-link :to="{ name: 'ShowApp', params: { appId: app.id } }">
                        <div style="border: 1px solid black; width: 100px; height: 100px; border-radius: 10px;">
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
import { useApps, useGuest } from '@/hooks';

const { list } = useApps();
const { guest } = useGuest();
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
        }
    }
</style>