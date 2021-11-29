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
import { useGuest, useApp } from '@/hooks';

const { guest, isSignedIn, signOut } = useGuest();
const $route = useRoute();
let { app } = useApp(parseInt($route.params.appId ?? -1));

const lastPagePath = ref(window.history.state.back);
const lastPageIsApps = computed(() => lastPagePath.value === '/apps' && $route.name === 'ShowApp');
const lastPageIsMyApps = computed(() => lastPagePath.value === '/my-apps' && $route.name === 'ShowApp');

const routes = computed(() => [
    {
        conf: {
            path: '/apps'
        },
        title: 'App List',
        show: true,
        active: lastPageIsApps.value
    },
    {
        conf: {
            path: `/app/${$route.params.appId}`,
        },
        title: app.value?.name ?? '',
        show: lastPageIsApps.value,
        active: lastPageIsApps.value
    },
    {
        conf: {
            path: '/my-apps'
        },
        title: 'My Apps',
        show: isSignedIn.value,
        active: lastPageIsMyApps.value
    },
    {
        conf: {
            path: `/app/${$route.params.appId}`,
        },
        title: app.value?.name ?? '',
        show: lastPageIsMyApps.value,
        active: lastPageIsMyApps.value
    },
    {
        conf: {
            path: '/account'
        },
        title: 'Account',
        show: isSignedIn.value,
        active: false
    },
    {
        click: signOut,
        icon: {
            name: 'log-out',
            position: 'after'
        },
        title: 'Logout',
        show: isSignedIn.value,
        active: false
    },
    {
        conf: {
            path: '/signin'
        },
        title: 'Signin',
        show: !isSignedIn.value,
        active: false
    },
    {
        conf: {
            path: '/signup'
        },
        title: 'Signup',
        show: !isSignedIn.value,
        active: false
    },
    {
        conf: {
            path: '/about'
        },
        title: 'About',
        show: true,
        active: false
    },
]);

const fullname = computed(() => guest.value.firstname + ' ' + guest.value.lastname);

window.history.pushState = new Proxy(window.history.pushState, {
  apply: (target, thisArg, argArray = undefined) => {
    const r = target.apply(thisArg, argArray);
    lastPagePath.value = window.history.state.back;
    console.log(lastPageIsApps.value, lastPageIsMyApps.value)
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
}
</style>