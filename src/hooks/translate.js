import * as tradObject from '@/assets/translate';

const language = window.navigator.userLanguage || window.navigator.language;
const defaultLang = 'fr';

export const useTranslate = () => {
    const trads = tradObject[(language in tradObject ? language : defaultLang)];

    return {
        /**
         * @param {String} key 
         * @param {String} defaultValue 
         * @param {Record<string, *>} data
         */
        __(key, defaultValue, data = {}) {
            const resultString = key.split('.')
                .reduce((r, c) => r && r[c] ? r[c] : null, trads) ?? defaultValue;
            
            return Object.keys(data)
                .reduce((r, c) => r.replace(new RegExp(`{${c}}`, 'g'), data[c]), resultString);
        }
    }
}