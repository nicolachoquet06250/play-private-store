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
import { useResponsive, useSearchbar, useWebsocket, useGuest, useToast, useApp } from '@/hooks';
import env from '../env.json';

const { resize, xs, sm } = useResponsive();
const { showed } = useSearchbar();
const { connect, disconnect, addWsEventListener } = useWebsocket(env.SOCKET_URL);
const { openToast } = useToast();
const { isSignedIn } = useGuest();

const header = ref();
const offsetHeight = computed(() => (header.value?.offsetHeight ?? 0) + 'px');
const marginTop = ref('50px');
const searchBarWidth = ref('calc(100% - 60px)');

watch(isSignedIn, () => {
  isSignedIn.value ? connect() : disconnect();
});

const actions = {
    ask_identity(ws, channel, _type, data) {
        const { guest } = useGuest();

        const { id: socketId } = data;
        
        const user = Object.keys(guest.value).reduce((r, c) => c === 'password' ? r : { ...r, [c]: guest.value[c] }, {});

        ws.send(JSON.stringify({
            channel,
            type: 'give',
            data: { user, id: socketId }
        }))
    },

    received_identity() {
        console.log('identitée bien reçue');
        openToast('Votre identité à bien été envoyé au serveur de notifications', 4000);
    },

    give_notify(_ws, _channel, _type, data) {
        const { guest } = useGuest();

        const { type: subType, appId, appName, users } = data;

        const concerned = users.indexOf(guest.value.id) !== -1;

        if (concerned) {
            const { app } = useApp(parseInt(appId));
            const name = app.value ? app.value.name : appName;
            openToast(`L'application ${name} ${subType === 'updated' ? `vient d'être mise à jour` : 'vient de sortir'}`, 4000);
        }
    }
};

addWsEventListener('message', (ws, event) => {
    const { channel, type, data } = JSON.parse(event.data);
    
    if (`${type}_${channel}` in actions) {
        actions[`${type}_${channel}`](ws, channel, type, data);
    } else {
        console.log(JSON.parse(event.data))
    }
});

addEventListener('close', () => {
  console.log('le socket à été fermé proprement');
})

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
