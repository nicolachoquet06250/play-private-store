<template>
    <ion-icon name="star" :size="size"
              @click.prevent.stop="edition($event)"
              @dbClick.prevent.stop="edition($event)"
              v-for="i of Array.from(Array(parseInt($note)).keys())" :key="i"></ion-icon>

    <template v-if="parseInt($note) < parseFloat($note)">
        <ion-icon name="star-half" :size="size"
                  @click.prevent.stop="edition($event)"></ion-icon>
        
        <ion-icon name="star-outline" :size="size" 
                  @click.prevent.stop="edition($event)"
                  v-for="i of Array.from(Array(5 - parseInt($note) - 1).keys())" :key="i"></ion-icon>
    </template>

    <template v-else>
        <ion-icon name="star-outline" :size="size"
                  @click.prevent.stop="edition($event)"
                  v-for="i of Array.from(Array(5 - parseInt($note)).keys())" :key="i"></ion-icon>
    </template>
</template>

<script setup>
import { defineProps, defineEmits, ref, getCurrentInstance, watch } from 'vue';

/**********************************************************/
/** DEFINITION DES PROPS **********************************/
/**********************************************************/

const props = defineProps({
        modelValue: Number,
        note: Number,
        size: {
            default: 'small'
        },
        editable: {
            default: false
        }
    });

/**********************************************************/
/** DEFINITION DES EVENEMENTS *****************************/
/**********************************************************/

defineEmits(['update:modelValue']);

/**********************************************************/
/** APPEL DES HOOKS ***************************************/
/**********************************************************/

const { emit } = getCurrentInstance();

/**********************************************************/
/** DEFINITION DES VARIABLES REACTIVES ********************/
/**********************************************************/

const $note = ref(props.editable ? props.modelValue : props.note);

const nbClicks = ref(0);
const timeout = ref(null);

/**********************************************************/
/** DEFINITIONS DES FONCTIONS *****************************/
/**********************************************************/

const getNoteFromStarIcon = icon => {
    let getRecursive;
    return (getRecursive = (icon, note) => {
        if (icon.previousElementSibling === null) {
            return note + 1;
        }

        return getRecursive(icon.previousElementSibling, note + 1);
    })(icon, 0);
};

const edition = e => {
    if (!props.editable) return;

    let target = e.target;
    if (target.tagName === 'path') {
        target = target.parentElement.parentElement.parentElement;
    } else if (target.tagName === 'svg') {
        target = target.parentElement.parentElement;
    }

    $note.value = getNoteFromStarIcon(target);

    // check double or simple click
    nbClicks.value++ 
    if(nbClicks.value === 1) {
        timeout.value = setTimeout(function() {
            // simple click
            // $note.value += 1;
            nbClicks.value = 0
        }, 500);
    } else {
        clearTimeout(timeout.value); 
        // double click
        $note.value -= .5;
        nbClicks.value = 0;
    }

    emit('update:modelValue', $note.value);
};

/**********************************************************/
/** MISE EN PLACE DES WATCHERS ****************************/
/**********************************************************/

watch(() => props.modelValue, () => {
    $note.value = props.modelValue;
});
</script>