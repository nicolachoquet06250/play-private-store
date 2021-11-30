<template>
    <ion-menu side="start" type="overlay" menu-id="menu" content-id="main">
        <ion-header>
            <ion-toolbar>
                <ion-title v-if="isSignedIn"> {{ fullname }} </ion-title>
                
                <ion-title v-else>
                    <ion-button @click="$router.push({ name: 'Signin' })" tag="ion-button">
                        Se connecter 
                    </ion-button>
                </ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <ion-list>
                <template v-for="route of routes" :key="route">
                    <ion-item class="link-item" v-if="route.show">
                        <AnimatedLink :routeConf="route.conf" :show="route.show" @click="route.click" :active="route.active" >
                            <ion-icon v-if="route.icon && route.icon.position === 'before'" 
                                      :name="route.icon.name" 
                                      style="padding-right: 15px;"></ion-icon>

                            <div v-if="route.logo" class="app-logo" :style="{ '--background-image': `url(${route.logo})` }"></div>
                            
                            <span> {{ route.title }} </span>

                            <ion-icon v-if="route.icon && route.icon.position === 'after'" 
                                      :name="route.icon.name" 
                                      style="padding-left: 15px;"></ion-icon>
                        </AnimatedLink>
                    </ion-item>
                </template>

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
import { useRoute } from 'vue-router';
import { useGuest, useApp, useTranslate } from '@/hooks';

const { guest, isSignedIn, signOut } = useGuest();
const $route = useRoute();
let { app } = useApp(parseInt($route.params.appId ?? -1));
const { __ } = useTranslate();

const lastPagePath = ref(window.history.state.back);
const lastPageIsApps = computed(() => lastPagePath.value === '/apps' && $route.name === 'ShowApp');
const lastPageIsMyApps = computed(() => lastPagePath.value === '/my-apps' && $route.name === 'ShowApp');

const routes = computed(() => [
    {
        conf: {
            path: '/apps'
        },
        title: __('sidebar.AppList', 'Applications'),
        show: true,
        active: lastPageIsApps.value
    },
    {
        conf: {
            path: `/app/${$route.params.appId}`,
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
        active: lastPageIsMyApps.value
    },
    {
        conf: {
            path: `/app/${$route.params.appId}`,
        },
        logo: app.value?.logo ?? '',
        title: app.value?.name ?? '',
        show: lastPageIsMyApps.value,
        active: lastPageIsMyApps.value
    },
    {
        conf: {
            path: '/account'
        },
        title: __('sidebar.Account', 'Mon compte'),
        show: isSignedIn.value,
        active: false
    },
    {
        click: signOut,
        icon: {
            name: 'log-out',
            position: 'after'
        },
        title: __('sidebar.Logout', 'Se déconnecter'),
        show: isSignedIn.value,
        active: false
    },
    {
        conf: {
            path: '/signin'
        },
        title: __('sidebar.Signin', `Se connecter`),
        show: !isSignedIn.value,
        active: false
    },
    {
        conf: {
            path: '/signup'
        },
        title: __('sidebar.Signup', `S'inscrire`),
        show: !isSignedIn.value,
        active: false
    },
    {
        conf: {
            path: '/about'
        },
        title: __('sidebar.About', 'A propos'),
        show: true,
        active: false
    },
]);

const fullname = computed(() => guest.value.firstname + ' ' + guest.value.lastname);

window.history.pushState = new Proxy(window.history.pushState, {
  apply: (target, thisArg, argArray = undefined) => {
    const r = target.apply(thisArg, argArray);
    lastPagePath.value = window.history.state.back;
    return r;
  },
});

watch(() => $route.params.appId, () => {
    if ($route.params.appId) {
        app = useApp(parseInt($route.params.appId ?? -1)).app;
    }
})
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