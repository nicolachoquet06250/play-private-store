<template>
    <ion-menu side="start" type="overlay" menu-id="menu" content-id="main">
        <ion-header>
            <ion-toolbar>
                <ion-title v-if="isSignedIn">
                    <div style="display: flex; justify-content: flex-end; align-items: center;">
                        <router-link :to="{ name: 'Account' }" style="width: 100%; display: flex; justify-content: space-between; align-items: center; color: black; text-decoration: none;">
                            {{ fullname }}

                            <ion-icon src="https://unpkg.com/ionicons@5.5.2/dist/svg/person-circle-outline.svg"></ion-icon>
                        </router-link>

                        <a href="/#" @click.prevent.stop="signOut" style="color: black; text-decoration: none;display: flex; justify-content: center; align-content: center; margin-left: 15px;">
                            <ion-icon name="log-out"></ion-icon>
                        </a>
                    </div>
                </ion-title>
                
                <ion-title v-else>
                    <ion-button @click="$router.push({ name: 'Signin' })">
                        {{ __('sidebar.Signin', 'Se connecter') }} 
                    </ion-button>
                </ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <ion-list>
                <template v-for="route of routes" :key="route">
                    <ion-item class="link-item" v-if="route.show">
                        <AnimatedLink :routeConf="route.conf" 
                                      :show="route.show" 
                                      :active="route.active" >
                            <div v-if="route.logo" 
                                 class="app-logo" 
                                 :style="{ 
                                     '--background-image': `url(${route.logo})`
                                 }"></div>
                            
                            <span>
                                {{ route.title }}
                            </span>
                        </AnimatedLink>
                    </ion-item>
                </template>

                <ion-item>
                    <ion-label>
                        <ion-icon size="large" src="https://unpkg.com/ionicons@5.5.2/dist/svg/language.svg"></ion-icon>
                    </ion-label>

                    <div class="select">
                        <select :value="lang" @change="updateLang($event.target.value)">
                            <option v-for="_lang of Object.keys(AVAILABLE_LANGS)" :key="_lang" 
                                    :value="AVAILABLE_LANGS[_lang]">
                                {{ _lang }}
                            </option>
                        </select>

                        <span class="focus"></span>
                    </div>
                </ion-item>

                <ion-item class="pwa-scope">
                    <PwaInstallButton />
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-menu>
</template>

<script setup>
import { PwaInstallButton, AnimatedLink } from '@/components';
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useGuest, useApp, useTranslate } from '@/hooks';

const { guest, isSignedIn, signOut } = useGuest();
const $route = useRoute();

const appId = computed(() => {
    if ($route.params.appid && !localStorage.getItem('last_appid')) {
        localStorage.setItem('last_appid', $route.params.appid);
    }

    return parseInt(localStorage.getItem('last_appid'));
})

const $router = useRouter();
let { app } = useApp(appId.value);
const { __, updateLang, lang, AVAILABLE_LANGS } = useTranslate();

//const lastAppId = ref(null);
const pagesHistory = ref([$router.currentRoute.value.fullPath]);
const lastPagePath = computed(() => pagesHistory.value[(pagesHistory.value.length === 1 ? 0 : pagesHistory.value.length - 2)]);
const currentPagePath = computed(() => pagesHistory.value[pagesHistory.value.length - 1]);
const lastPageIsApps = computed(() => (lastPagePath.value === '/apps' || lastPagePath.value === '/') && $router.currentRoute.value.name === 'ShowApp');
const lastPageIsMyApps = computed(() => lastPagePath.value === '/my-apps' && $router.currentRoute.value.name === 'ShowApp');

const routes = computed(() => [
    {
        conf: {
            path: '/account'
        },
        title: __('sidebar.Account', 'Mon compte'),
        show: isSignedIn.value && currentPagePath.value === '/account',
        active: currentPagePath.value === '/account'
    },
    {
        conf: {
            path: '/apps'
        },
        title: __('sidebar.AppList', 'Applications'),
        show: true,
        active: lastPageIsApps.value || currentPagePath.value === '/apps'
    },
    {
        conf: {
            name: 'ShowApp',
            params: {
                appid: appId.value
            }
        },
        logo: app.value?.logo ?? '',
        title: app.value?.name ?? '',
        show: lastPageIsApps.value,
        active: lastPageIsApps.value
    },
    {
        conf: {
            path: '/my-apps'
        },
        title: __('sidebar.MyApps', 'Mes applications'),
        show: isSignedIn.value,
        active: lastPageIsMyApps.value || currentPagePath.value === '/my-apps'
    },
    {
        conf: {
            path: '/create-app'
        },
        title: __('sidebar.CreateApp', 'Créer une application'),
        show: lastPagePath.value === '/my-apps' && currentPagePath.value === '/create-app',
        active: lastPagePath.value === '/my-apps' && currentPagePath.value === '/create-app'
    },
    {
        conf: {
            name: 'ShowApp',
            params: {
                appid: appId.value
            }
        },
        logo: app.value?.logo ?? '',
        title: app.value?.name ?? '',
        show: lastPageIsMyApps.value,
        active: lastPageIsMyApps.value
    },
    {
        conf: {
            path: '/signin'
        },
        title: __('sidebar.Signin', `Se connecter`),
        show: !isSignedIn.value,
        active: currentPagePath.value === '/signin'
    },
    {
        conf: {
            path: '/signup'
        },
        title: __('sidebar.Signup', `S'inscrire`),
        show: !isSignedIn.value,
        active: currentPagePath.value === '/signup'
    },
    {
        conf: {
            path: '/about'
        },
        title: __('sidebar.About', 'A propos'),
        show: true,
        active: currentPagePath.value === '/about'
    },
]);

const fullname = computed(() => guest.value.firstname + ' ' + guest.value.lastname);

watch($router.currentRoute, () => {
    pagesHistory.value.push($router.currentRoute.value.fullPath);
    console.log(currentPagePath.value);
    console.log(lastPagePath.value);
})

/*watch(() => $route.params.appid, () => {
    if ($route.params.appid) {
        lastAppId.value = parseInt($route.params.appid ?? -1);
        app = useApp(lastAppId.value).app;
    }
});**/
</script>

<style lang="scss">
.link-item {
    .link-item.item-md {
        padding: 0;

        .item-inner {
            padding: 0;
        }
    }

    .app-logo {
        display: inline-block;
        width: 50px;
        height: 50px;
        border: 1px solid black;
        border-radius: 5px;
        background-image: var(--background-image, none);
        background-color: white;
        margin-top: 5px;
        margin-bottom: 10px;
        margin-right: 10px;
        background-position: center;
        background-size: contain;
    }
}
</style>

<style lang="scss" scoped>
select {
    --select-border: #777;
    --select-focus: blue;
    --select-arrow: var(--select-border);

    width: 100%;
    // A reset of styles, including removing the default dropdown arrow
    appearance: none;
    // Additional resets for further consistency
    background-color: transparent;
    border: none;
    margin: 0;
    font-family: inherit;
    line-height: inherit;
    outline: none;
    padding: 0.25em 0.5em;
    font-size: 1.25rem;
    cursor: pointer;
    display: grid;
    grid-template-areas: "select";
    align-items: center;
    position: relative;
    grid-area: select;

    &::-ms-expand {
        display: none;
    }

    &::after {
        content: "";
        width: 0.8em;
        height: 0.5em;
        background-color: var(--select-arrow);
        clip-path: polygon(100% 0%, 0 0%, 50% 100%);
        justify-self: end;
        grid-area: select;
    }

    &:focus + .focus {
        position: absolute;
        top: -1px;
        left: -1px;
        right: -1px;
        bottom: -1px;
        border: 2px solid var(--select-focus);
        border-radius: inherit;
    }

    &[multiple] {
        padding-right: 0;
        height: 6rem;

        option {
            white-space: normal;
        }
    }
}

.select {
    border: none; 
    background: none; 
    border-bottom: 1px solid black; 
    width: max-content;
    flex: 5;
}

.select--disabled {
  cursor: not-allowed;
  background-color: #eee;
  background-image: linear-gradient(to top, #ddd, #eee 33%);
}
</style>