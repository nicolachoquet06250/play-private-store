<template>
  <ion-app>
    <ion-content>
      <ion-header>
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
</script>

<style>
#main {
  padding-top: 70px;
}
</style>
