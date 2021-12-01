import * as tradObject from '@/assets/translate';
import { ref, computed } from 'vue';
import { useMutationObserver } from '@vueuse/core';

const el = ref(document.querySelector('html'));
const defaultLang = 'fr';
const language = ref(el.value.getAttribute('lang') ?? defaultLang);
const AVAILABLE_LANGS = {
    Français: 'fr',
    English: 'en'
};

export const useTranslate = () => {
    const trads = computed(() => tradObject[(language.value in tradObject ? language.value : defaultLang)]);

    return {
        lang: computed(() => language.value),
        AVAILABLE_LANGS: computed(() => AVAILABLE_LANGS),

        /**
         * @param {'fr'|'en'} lang 
         */
        updateLang(lang) {
            el.value.setAttribute('lang', lang);
        },

        /**
         * @param {String} key clé associée à la valeur voulue dans l'objet de traduction
         * @param {String} defaultValue valeur par défault si la clé n'est pas trouvée
         * @param {Record<string, *>} data données à remplacer dans la valeur voulu
         */
        __(key, defaultValue, data = {}) {
            return Object.keys(data)
                .reduce((r, c) => 
                    r.replace(
                        new RegExp(`{${c}}`, 'g'), 
                        data[c]
                    ), 
                    (key.split('.')
                        .reduce((r, c) => 
                            r && r[c] ? r[c] : null, trads.value) ?? defaultValue)
                );
        }
    }
};

useMutationObserver(el, mutations => {
    if (mutations[0]) {
        language.value = el.value.getAttribute('lang');
    }
}, { attributes: true })