<template>
    <ion-menu side="start" type="overlay" menu-id="menu" content-id="main">
        <ion-header>
            <ion-toolbar>
                <ion-title v-if="guest !== null"> {{ fullname }} </ion-title>
                
                <ion-title v-else>
                    <router-link :to="{ name: 'Signin' }">
                        Se connecter 
                    </router-link>
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
            </ion-list>
        </ion-content>
    </ion-menu>
</template>

<script setup>
// import DarkModeButton from "@/components/DarkModeButton.vue";
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
// import { useRoute } from "vue-router";
// import { useTheme, useDark } from "@/hooks";

// const { bgPrimary, colorPrimary, bgSecondary, colorSecondary } = useTheme();
// const $route = useRoute();
// const { isDark } = useDark();

/*const selectedRoute = computed(() => $route.name);

const sidebarToolbarTheme = () => ({
  "--ion-color-md-danger": bgPrimary[isDark.value],
  "--color": colorPrimary[isDark.value],
});

const sidebarContentTheme = () => ({
  "--ion-background-md-color": bgSecondary[isDark.value],
  "--ion-background-color": bgSecondary[isDark.value],
  "--ion-text-md-color": colorSecondary[isDark.value],
  "--ion-text-color": colorSecondary[isDark.value],
});

const darkModeButtonTheme = () => ({
  "--margin-right": "5px",
  "--margin-left": "10px",
  "--color": colorSecondary[isDark.value],
  '--ion-color-md-primary': isDark.value ? '#222428' : '#0000FF',
  '--ion-color-primary': isDark.value ? '#222428' : '#0000FF',
  '--ion-color-md-primary-contrast': 'white',
  '--ion-color-primary-contrast': 'white'
});

const linkTheme = (name) => ({
  color:
    selectedRoute.value === name
      ? (isDark.value ? 'white' : 'gray')
      : colorSecondary[isDark.value],
});*/

</script>