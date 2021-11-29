<template>
    <ion-app v-if="app !== null">
        <ion-content id="show-app">
            <ion-grid>
                <ion-row>
                    <div>
                        <div class="app-icon"></div>
                    </div>

                    <div style="max-width: 200px;">
                        <ion-list class="app-details">
                            <ion-item>
                                <h1 class="app-title"> {{ app.name }} </h1>
                            </ion-item>

                            <ion-item>
                                <span class="app-author"> {{ fullname }} </span>
                            </ion-item>

                            <ion-item>
                                <span class="app-version"> 
                                    <ion-chip>
                                        <ion-icon :src="`https://unpkg.com/ionicons@5.5.2/dist/svg/logo-${app.repo_type}.svg`" 
                                                   style="background: #e5e5e5; color: black;"></ion-icon>

                                        <ion-label> {{ app.version }} </ion-label>
                                    </ion-chip>
                                </span>
                            </ion-item>
                        </ion-list>
                    </div>
                </ion-row>

                <ion-row v-if="app.categories.length > 0">
                    <ion-col style="height: 50px; width: max-content; display: flex; flex-wrap: nowrap; overflow-x: auto!important; overflow-y: hidden;">
                        <ion-chip v-for="(category, i) of app.categories" :key="i" style="margin-left: 5px;">
                            <ion-icon name="folder" style="background: #e5e5e5; color: black;"></ion-icon>

                            <ion-label> {{ category }} </ion-label>
                        </ion-chip>
                    </ion-col>
                </ion-row>

                <ion-row>
                    <ion-col>
                        <ion-button color="primary" size="small" 
                                    :style="installButtonStyle" @click="openApk">
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
                        <ion-title :style="sectionTitleStyle">A propos de l'appli</ion-title> 

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
                        <ion-title :style="sectionTitleStyle">Notes et avis</ion-title> 

                        <ion-icon name="arrow-round-forward" size="small"></ion-icon>
                    </ion-col>
                </ion-row>

                <ion-row>
                    <ion-col>
                        <h1 :style="noteTitleStyle"> {{ app.stars }} </h1>

                        <div :style="noteStarsStyle">
                            <Stars :note="app.stars" />
                        </div>
                    </ion-col>
                </ion-row>

                <ion-row v-if="!mine && isSignedIn">
                    <ion-col>
                        <ion-grid>
                            <ion-row>
                                <ion-col>
                                    Votre note : <Stars v-model="newNote" :editable="true" @change="onNoteChange" />
                                </ion-col>
                            </ion-row>

                            <ion-row>
                                <ion-col>
                                    <ion-item>
                                        <ion-label position="floating">Commentaire...</ion-label>
                                    
                                        <ion-textarea></ion-textarea>
                                    </ion-item>
                                </ion-col>
                            </ion-row>

                            <ion-row>
                                <ion-col>
                                    <ion-button size="small"> Envoyer </ion-button>
                                </ion-col>
                            </ion-row>
                        </ion-grid>
                    </ion-col>
                </ion-row>

                <ion-row v-for="comment of app.comments" :key="comment">
                    <ion-col>
                        <h5>{{ getUser(comment.author).firstname }} {{ getUser(comment.author).lastname }}</h5>

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
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useApp, useGuest, useSearchbar, useRepos } from '@/hooks';

/**********************************************************/
/** APPEL DES HOOKS ***************************************/
/**********************************************************/

const $route = useRoute();
const appId = computed(() => parseInt($route.params.appId));

const { app } = useApp(appId.value);
const { user: getUser, guest, isSignedIn } = useGuest();
const { hide } = useSearchbar();
const $repos = useRepos();

/**********************************************************/
/** APPEL DES SOUS HOOKS **********************************/
/**********************************************************/

hide();

/**********************************************************/
/** DEFINITION DES VARIABLES REACTIVES READONLY ***********/
/**********************************************************/

const newNote = ref(0);

const user = getUser(app.value.author);
const icon = computed(() => `url(${app.value.logo})`);
const fullname = computed(() => user.firstname + ' ' + user.lastname);
const description = computed(() => (app.value.description ?? '').split(' ').length > 15 
    ? (app.value.description ?? '').split(' ').reduce((r, c) => 
        ({ cmp: r.cmp + 1, result: (r.cmp > 15 ? r : [...r.result, c]) }), 
        { cmp: 0, result: [] }
    ).result.join(' ') + ' ...' 
        : (app.value.description ?? ''));
const apkUrl = computed(() => $repos[app.value.repo_type] + '/' + getUser(app.value.author).repo_pseudo[app.value.repo_type] + '/' + app.value.repoName + '/releases/download/' + app.value.version + '/' + app.value.nameSlug + '-' + app.value.versionSlug + '.apk')

const mine = app.value.author === guest.value?.id;

/**********************************************************/
/** DEFINITION DES STYLES *********************************/
/**********************************************************/

const installButtonStyle = computed(() => ({
    display: 'flex', 
    'justify-content': 'space-around', 
    'flex-direction': 'column'
}));
const sectionTitleStyle = computed(() => ({
    'padding-left': 0
}));
const noteTitleStyle = computed(() => ({
    display: 'flex', 
    'justify-content': 'center'
}));
const noteStarsStyle = computed(() => ({
    display: 'flex', 
    'justify-content': 'center'
}));

/**********************************************************/
/** DEFINITIONS DES FONCTIONS *****************************/
/**********************************************************/

const openApk = () => {
    window.open(apkUrl.value, '_blank');
};
</script>

<style lang="scss">
#show-app {
    margin-top: 15px;
    
    .app-details {
        .item {
            min-height: 30px!important;
        }
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

    .app-title,
    .app-author,
    .app-version {
        margin-left: 15px;
    }

    .app-title {
        margin-left: 15px;
        margin-top: 0;
    }

    ion-col ion-chip > ion-icon,
    ion-item ion-icon {
        border-right: 2px solid white;
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
}


</style>
