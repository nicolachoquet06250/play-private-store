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
import { ref, computed } from 'vue';
import { useResponsive, useSearchbar, useWebsocket } from '@/hooks';
import env from '../env.json';

const { resize, xs, sm } = useResponsive();
const { showed } = useSearchbar();
const { connect, addWsEventListener } = useWebsocket(env.SOCKET_URL);

const header = ref();
const offsetHeight = computed(() => (header.value?.offsetHeight ?? 0) + 'px');
const marginTop = ref('50px');
const searchBarWidth = ref('calc(100% - 60px)');

connect();

const actions = {
  ask_identity(ws, channel, type, data) {
      const { id: socketId } = data;
      
      const user = {
          id: 0,
          firstname: 'Nicolas',
          lastname: 'Choquet',
          email: 'nchoquet@norsys.fr',
          repos_pseudo: {
              github: 'nicolachoquet06250',
              gitlab: 'nicolachoquet06250'
          },
          followed_apps: [1]
      };

      ws.send(JSON.stringify({
          channel,
          type: 'give',
          data: { user, id: socketId }
      }))
    },

    received_identity() {
        console.log('identitée bien reçue');
    },

    give_notify(channel, type, data) {
      console.log(data);
    }
};

addWsEventListener('message', (ws, event) => {
    const { data } = event;
    const { channel, type, data: _data } = JSON.parse(data);
    
    if (`${type}_${channel}` in actions) {
        actions[`${type}_${channel}`](ws, channel, type, _data);
    } else {
        console.log(JSON.parse(data))
    }
});

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
