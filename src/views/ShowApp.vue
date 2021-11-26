<template>
    <ion-app v-if="app !== null">
        <ion-content id="show-app">
            <ion-grid>
                <ion-row>
                    <div>
                        <div class="app-icon"></div>
                    </div>

                    <div>
                        <h1 class="app-title"> {{ app.name }} </h1>

                        <span class="app-author"> {{ fullname }} </span>
                    </div>
                </ion-row>

                <ion-row>
                    <ion-col>
                        <ion-button color="primary" size="small" 
                                    style="display: flex; justify-content: space-around; flex-direction: column;"
                                    @click="openApk">
                            Installer
                        </ion-button>
                    </ion-col>
                </ion-row>

                <ion-row>
                    <ion-col v-for="(screenshot, i) of app.screenshots" :key="i">
                        <div :style="{ background: `url(${screenshot})` }"></div>
                    </ion-col>

                    <template v-if="app.screenshots.length === 0">
                        <ion-col>
                            <span> Aucune captures d'écrans pour cette application </span>
                        </ion-col>
                    </template>
                </ion-row>

                <ion-row>
                    <ion-col class="app-about">
                        <ion-title style="padding-left: 0;">A propos de l'appli</ion-title> 

                        <ion-icon name="arrow-round-forward" size="small"></ion-icon>
                    </ion-col>
                </ion-row>

                <ion-row>
                    <ion-col class="app-description">
                        {{ description }}
                    </ion-col>
                </ion-row>

                <ion-row>
                    <ion-col class="app-about">
                        <ion-title style="padding-left: 0;">Notes et avis</ion-title> 

                        <ion-icon name="arrow-round-forward" size="small"></ion-icon>
                    </ion-col>
                </ion-row>

                <ion-row>
                    <ion-col>
                        <h1 style="display: flex; justify-content: center;"> {{ app.stars }} </h1>

                        <div style="display: flex; justify-content: center;">
                            <Stars :note="app.stars" />
                        </div>
                    </ion-col>
                </ion-row>

                <ion-row v-for="comment of app.comments" :key="comment">
                    <ion-col>
                        <h5>{{ user(comment.author).firstname }} {{ user(comment.author).lastname }}</h5>

                        <div class="app-comment-head">
                            <div>
                                <Stars :note="comment.note" />
                            </div>

                            <div class="app-comment-head_date">
                                {{ comment.date }}
                            </div>
                        </div>

                        <div class="app-comment_text">
                            {{ comment.comment }}
                        </div>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-app>

    <ion-app v-else>
        <NotFound message="Application not found" />
    </ion-app>
</template>

<script setup>
import { Stars, NotFound } from '@/components';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useApp, useGuest, useSearchbar } from '@/hooks';

const $route = useRoute();
const appId = computed(() => parseInt($route.params.appId));
const { app } = useApp(appId.value);
const { user } = useGuest();
const { hide } = useSearchbar();

hide();

const guest = user(app.value.author);
const icon = computed(() => `url(${app.value.logo})`);
const fullname = computed(() => guest.firstname + ' ' + guest.lastname);
const description = computed(() => (app.value.description ?? '').split(' ').length > 15 
    ? (app.value.description ?? '').split(' ').reduce((r, c) => 
        ({ cmp: r.cmp + 1, result: (r.cmp > 15 ? r : [...r.result, c]) }), 
        { cmp: 0, result: [] }
    ).result.join(' ') + ' ...' 
        : (app.value.description ?? ''));
const apkUrl = computed(() => user(app.value.author).github + '/' + app.value.repoName + '/releases/download/' + app.value.version + '/' + app.value.nameSlug + '-' + app.value.versionSlug + '.apk')

const openApk = () => {
    window.open(apkUrl.value, '_blank');
};
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
    background-image: v-bind(icon);
    background-color: white;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    background-attachment: inherit;
}

.app-title {
    font-size: 15px;
    margin-left: 15px;
    margin-top: 0;
}

.app-author {
    margin-left: 15px;
}

.app-note {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.app-description::first-letter {
    text-transform: capitalize;
}

.app-about {
    display: flex; 
    justify-content: space-between;
}

.app-comment-head {
    display: flex;
    justify-content: space-between;
}

.app-comment-head_date {
    display: flex;
    align-items: center;
}

.app-comment_text {
    margin-top: 15px;
    max-width: 250px;
}
</style>
