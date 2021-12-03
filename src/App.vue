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
    </ion-content>
  </ion-app>
</template>

<script setup>
import { Sidebar, Toast } from '@/components';
import { ref, computed } from 'vue';
import { useResponsive, useSearchbar/*, useWebsocket*/ } from '@/hooks';

const { resize, xs, sm } = useResponsive();
const { showed } = useSearchbar();
//const { connect, addWsEventListener } = useWebsocket('localhost:8000/ws');

const header = ref();
const offsetHeight = computed(() => (header.value?.offsetHeight ?? 0) + 'px');
const marginTop = ref('50px');
const searchBarWidth = ref('calc(100% - 60px)');

/*connect();

addWsEventListener('open', ws => {
    console.log('la connection à été ouverte');
    ws.send('Coucou le serveur !');
});

addWsEventListener('message', (_, event) => {
    console.log('Voici un message du serveur', event.data);
});*/

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
