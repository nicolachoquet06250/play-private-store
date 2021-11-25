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
                    <ion-item v-if="route.show">
                        <router-link :to="route.conf" v-if="route.show && route.conf">
                            {{ route.title }}
                        </router-link>

                        <a href="#" @click.prevent.stop="route.click" v-if="route.show && !route.conf">
                            {{ route.title }}
                        </a>
                    </ion-item>
                </template>

                <ion-item>
                    <PwaInstallButton />
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-menu>
</template>

<script setup>
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