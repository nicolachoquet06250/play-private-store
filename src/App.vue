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

              <div>
                <ion-searchbar show-cancel-button="focus"></ion-searchbar>
              </div>
            </ion-row>
          </ion-grid>
        </ion-toolbar>
      </ion-header>

      <router-view id="main"/>

      <Sidebar />
    </ion-content>
  </ion-app>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue';
import { ref, computed, onMounted } from 'vue';

const header = ref(null);
const offsetHeight = computed(() => (header.value?.offsetHeight ?? 0) + 'px');
const marginTop = ref(offsetHeight.value);

const resizeMarginTop = () => (marginTop.value = header.value.offsetHeight + 'px');

onMounted(() => {
  setTimeout(resizeMarginTop, 1500);
});

window.addEventListener('resize', resizeMarginTop);
</script>

<style>
#main {
  padding-top: v-bind(marginTop);
}
</style>
