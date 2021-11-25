<template>
    <router-link :to="routeConf" v-if="show && routeConf">
        <slot></slot>

        <div class="underline-left"></div>
        <div class="underline-right"></div>
    </router-link>

    <a href="#" @click.prevent.stop="$emit('click', $event)" v-if="show && !routeConf">
        <slot></slot>

        <div class="underline-left"></div>
        <div class="underline-right"></div>
    </a>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
    routeConf: {
        type: () => ({
            path: String
        }),
        default: undefined
    },
    show: {
        type: Boolean
    },
    click: {
        type: Function
    }
});

defineEmits(['click']);
</script>

<style lang="scss" scoped>
a {
    color: black;
    text-decoration: none;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 20px;
    width: 100%;
    height: 100%;
    position: relative;
    transition: transform .5s linear;

    .underline-left {
        content: '';
        display: block;
        width: 50%;
        height: 3px;
        background: black;
        position: absolute;
        bottom: 0;
        left: 0;
        transform: translateX(-100%);
        transition: transform .5s linear;
    }

    .underline-right {
        content: '';
        display: block;
        width: 50%;
        height: 3px;
        background: black;
        position: absolute;
        bottom: 0;
        right: 0;
        transform: translateX(100%);
        transition: transform .5s linear;
    }

    &.router-link-active,
    &.router-link-exact-active,
    &:hover {
        opacity: .7;

        .underline-left,
        .underline-right {
            transform: translateX(0);
        }
    }
}
</style>