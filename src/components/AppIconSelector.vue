<template>
    <router-link :to="href" :style="linkStyle">
        <div class="app-icon" :style="appIconStyle"></div>

        <div :style="appDetailsWrapperStyle">
            <div :style="appNameStyle"> {{ app.name }} </div>

            <div :style="iconsWrapperStyle">
                <div :style="starsWrapperStyle">
                    <Stars :note="app.stars" size="small" />
                </div>

                <template v-if="showMyAppIcon">
                    <div :style="myAppIconWrapperStyle">
                        <ion-icon name="person"></ion-icon>
                    </div>
                </template>
            </div>
        </div>
    </router-link>
</template>

<script setup>
import { Stars } from '@/components';
import { defineProps, computed } from 'vue';
import { useGuest } from '@/hooks';

/**********************************************************/
/** APPEL DES HOOKS ***************************************/
/**********************************************************/

const { isSignedIn, guest } = useGuest();

/**********************************************************/
/** DEFINITION DES PROPS **********************************/
/**********************************************************/

const props = defineProps({
    app: {
        type: () => ({
            id: Number,
            logo: String,
            name: String,
            stars: Number,
            author: Number
        })
    },
    mine: {
        type: Boolean
    }
});

/**********************************************************/
/** DEFINITION DES VARIABLES REACTIVES READONLY ***********/
/**********************************************************/

const showMyAppIcon = computed(() => isSignedIn.value && guest.value.id === props.app.author);

const href = computed(() => ({ 
    name: 'ShowApp', 
    params: { 
        appId: props.app.id
    }
}));

/**********************************************************/
/** DEFINITION DES STYLES *********************************/
/**********************************************************/

const linkStyle = computed(() => ({
    height: '100%', 
    display: 'flex',
    'flex-direction': 'column'
}));

const appIconStyle = computed(() => ({
    '--icon': `url(${props.app.logo})`,
    display: 'flex',
    'align-self': 'center'
}));

const appDetailsWrapperStyle = computed(() => ({
    display: 'flex', 
    'flex-direction': 'column', 
    'justify-content': 'space-between', 
    height: 'calc(100% - 90px)',
    'padding-left': (props.app.name.length >= 17 ? '35px' : '5px')
}));

const appNameStyle = computed(() => ({
    'text-align': 'left',
    'padding-top': '5px'
}));

const iconsWrapperStyle = computed(() => ({
    'text-align': 'left', 
    'padding-left': 0, 
    display: 'flex'
}));

const starsWrapperStyle = computed(() => ({
    display: 'flex', 
    'justify-content': 'center', 
    'align-items': 'center'
}));

const myAppIconWrapperStyle = computed(() => ({
    display: 'flex', 
    'justify-content': 'center', 
    'align-items': 'center'
}));
</script>
