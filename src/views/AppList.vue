<template>
    <ion-app>
        <ion-content id="app-list">
            <ion-grid>
                <template v-if="_list.length > 0">
                    <ion-row v-for="(lineApp, i) of list" :key="i">
                        <ion-col :style="{'max-width': '50%', 'margin-top': (i > 0 ? '15px' : '0'), display: 'flex', 'justify-content': 'center'}"
                                 v-for="app of lineApp" :key="app.id">
                            <AppIconSelector :app="app" />
                        </ion-col>
                    </ion-row>
                </template>
                
                <template v-else>
                    <ion-row>
                        <ion-col>
                            <ion-text style="font-size: 20px;">
                                Vous n'avez enregistré encore aucune application.
                            </ion-text>
                        </ion-col>
                    </ion-row>
                </template>
            </ion-grid>
        </ion-content>

        <ion-footer v-if="mine" style="height: 50px;">
            <CreateAppRedirectButton id="footer-create-app-redirect-button" />
        </ion-footer>
    </ion-app>
</template>

<script setup>
import { AppIconSelector, CreateAppRedirectButton } from '@/components';
import { defineProps, computed, ref } from 'vue';
import { useApps, useSearchbar, useResponsive } from '@/hooks';

const props = defineProps({
    mine: {
        default: false
    }
});

const { list: globalList, myList } = useApps();
const { show } = useSearchbar();
const { xs, sm, md } = useResponsive();

show();

const nbElementPerLine = ref(2);

const _list = computed(() => props.mine ? myList.value : globalList.value);
const list = computed(() => {
    const r = _list.value.reduce((r, c) => {
        c.type = 'app-display'

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

    #footer-create-app-redirect-button {
        position: absolute;
        bottom: 50%;
        left: calc(50% - 28px);
        right: calc(50% - 28px);

        .fab-button {
            border: 2px solid white;
        }
    }
</style>