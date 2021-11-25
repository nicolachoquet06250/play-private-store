<template>
    <router-link :to="{ name: 'ShowApp', params: { appId: app.id } }" 
                 style="height: 100%; display: inline-block;">
        <div class="app-icon" 
             :style="{ '--icon': `url(${app.logo})` }"></div>

        <div style="display: flex; flex-direction: column; justify-content: space-between; height: calc(100% - 90px);">
            <div style="text-align: left; padding-top: 5px;"> 
                {{ app.name }}
            </div>

            <div style="text-align: left; padding-left: 0; display: flex;">
                <div style="display: flex; justify-content: center; align-items: center;">
                    <Stars :note="app.stars" size="small" />
                </div>

                <template v-if="isSignedIn && guest.id === app.author">
                    <div style="display: flex; justify-content: center; align-items: center;">
                        <ion-icon name="person"></ion-icon>
                    </div>
                </template>
            </div>
        </div>
    </router-link>
</template>

<script setup>
import { defineProps } from 'vue';
import Stars from '@/components/Stars.vue';
import { useGuest } from '@/hooks';

defineProps({
    app: {
        type: () => ({
            id: Number,
            logo: String,
            name: String,
            stars: Number
        })
    }
});

const { isSignedIn, guest } = useGuest();
</script>
