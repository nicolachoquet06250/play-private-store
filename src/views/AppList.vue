<template>
    <ion-app>
        <ion-content id="app-list">
            <ion-grid>
                <template v-if="list.length > 0">
                    <ion-row v-for="(lineApp, i) of list" :key="i">
                        <ion-col :style="{'max-width': '50%', 'margin-top': (i > 0 ? '15px' : 'auto'), display: 'flex', 'justify-content': 'center'}"
                                    v-for="app of lineApp" :key="app.id">
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

                                        <template v-if="isSignedIn && guest.id === app.author">
                                            <div style="display: flex; justify-content: center; align-items: center;">
                                                <ion-icon name="person"></ion-icon>
                                            </div>
                                        </template>
                                    </div>
                                </div>
                            </router-link>
                        </ion-col>
                    </ion-row>
                </template>
                
                <template v-else>
                    <ion-row>
                        <ion-col>
                            <ion-fab-button @click="$router.push({ name: 'CreateApp' })">
                                <ion-icon name="add"></ion-icon>
                            </ion-fab-button>

                            <ion-text style="font-size: 20px; top: 70px; position: absolute;">
                                Vous n'avez enregistré encore aucune application.
                            </ion-text>
                        </ion-col>
                    </ion-row>
                </template>
            </ion-grid>
        </ion-content>
    </ion-app>
</template>

<script setup>
import Stars from '@/components/Stars.vue';
import { defineProps, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useApps, useGuest, useSearchbar, useResponsive } from '@/hooks';

const props = defineProps({
    mine: {
        default: false
    }
});

const $router = useRouter();
const { list: globalList, myList } = useApps();
const { guest, isSignedIn } = useGuest();
const { show } = useSearchbar();
const { xs, sm, md } = useResponsive();

show();

const nbElementPerLine = ref(2);

const _list = computed(() => props.mine ? myList.value : globalList.value);
const list = computed(() => {
    const r = _list.value.reduce((r, c) => {
        if (r.cmp % nbElementPerLine.value === 0) {
            r.tmp.push(c);
        } else {
            r.tmp.push(c);
            r.result.push([...r.tmp]);
            r.tmp = [];
        }

        r.cmp++;
        return r;
    }, { cmp: 0, result: [], tmp: [] });

    if (r.tmp.length > 0) {
        if (r.result[r.result.length - 1].length >= nbElementPerLine.value) {
            r.result.push([]);
        }
        r.result[r.result.length - 1] = [...r.result[r.result.length - 1], ...r.tmp];
    }

    return r.result;
});

xs(() => {
    nbElementPerLine.value = 2;
});
sm(() => {
    nbElementPerLine.value = 3;
});
md(() => {
    nbElementPerLine.value = 4;
});
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