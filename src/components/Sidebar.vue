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
                        <AnimatedLink :routeConf="route.conf" :show="route.show" @click="route.click" >
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
import { computed } from 'vue';
import { useGuest } from '@/hooks';

const { guest, isSignedIn, signOut } = useGuest();

const routes = computed(() => [
    {
        conf: {
            path: '/apps'
        },
        title: 'App List',
        show: true
    },
    {
        conf: {
            path: '/my-apps'
        },
        title: 'My Apps',
        show: isSignedIn.value
    },
    {
        conf: {
            path: '/account'
        },
        title: 'Account',
        show: isSignedIn.value
    },
    {
        conf: {
            path: '/create-app'
        },
        title: 'Create App',
        show: isSignedIn.value
    },
    {
        click() {
            signOut('Home')
        },
        icon: {
            name: 'log-out',
            position: 'after'
        },
        title: 'Logout',
        show: isSignedIn.value
    },
    {
        conf: {
            path: '/signin'
        },
        title: 'Signin',
        show: !isSignedIn.value
    },
    {
        conf: {
            path: '/signup'
        },
        title: 'Signup',
        show: !isSignedIn.value
    },
    {
        conf: {
            path: '/about'
        },
        title: 'About',
        show: true
    },
]);

const fullname = computed(() => guest.value.firstname + ' ' + guest.value.lastname);
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