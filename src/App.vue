<template>
  <ion-app>
    <ion-content>
      <ion-header ref="header">
        <ion-toolbar>
          <ion-grid>
            <ion-row>
              <div>
                <ion-menu-button menu="menu"></ion-menu-button>
              </div>

              <div v-if="showed">
                <ion-searchbar show-cancel-button="focus"></ion-searchbar>
              </div>
            </ion-row>
          </ion-grid>
        </ion-toolbar>
      </ion-header>

      <router-view id="main"/>

      <Sidebar />

      <Toast />

      <Loader />
    </ion-content>
  </ion-app>
</template>

<script setup>
import { Sidebar, Toast, Loader } from '@/components';
import { ref, computed, watch } from 'vue';
import { useResponsive, useSearchbar, useWebsocket, useGuest } from '@/hooks';
import { useNotif } from '@/hooks/notifications';
import onMessage, * as actions from '@/websockets/actions';
import env from '../env.json';

/**********************************************************/
/** APPEL DES SOUS HOOKS **********************************/
/**********************************************************/

const { resize, xs, sm } = useResponsive();
const { showed } = useSearchbar();
const { connect, disconnect, addWsEventListener } = useWebsocket(env.SOCKET_URL);
const { isSignedIn } = useGuest();
const { create: createNotif } = useNotif();

createNotif('Ma tâche');

setTimeout(() => {
  createNotif('Ma tâche 2');
}, 5000);

/**********************************************************/
/** DEFINITION DES VARIABLES REACTIVES ********************/
/**********************************************************/

const header = ref();
const offsetHeight = computed(() => (header.value?.offsetHeight ?? 0) + 'px');
const marginTop = ref('50px');
const searchBarWidth = ref('calc(100% - 60px)');

/**********************************************************/
/** DEFINITION DES LISTENERS ******************************/
/**********************************************************/

addWsEventListener('message', onMessage(actions));

addEventListener('close', () => {
  console.log('le socket à été fermé proprement');
})

/**********************************************************/
/** DEFINITION DES LISTENERS DE RESPONSIVE ****************/
/**********************************************************/

resize(() => {
  marginTop.value = offsetHeight.value;

  setTimeout(() => {
    marginTop.value = offsetHeight.value;
  }, 200);
});

xs(() => {
  searchBarWidth.value = 'calc(100% - 60px)';
});

sm(() => {
  searchBarWidth.value = 'auto';
});

/**********************************************************/
/** MISE EN PLACE DES WATCHERS ****************************/
/**********************************************************/

watch(() => isSignedIn.value, () => {
  isSignedIn.value ? connect() : disconnect();
});
</script>

<style>
#main {
  padding-top: 70px;
}
</style>

<style scoped>
ion-header ion-toolbar ion-grid ion-row div:nth-child(2) {
  width: v-bind(searchBarWidth)
}
</style>
