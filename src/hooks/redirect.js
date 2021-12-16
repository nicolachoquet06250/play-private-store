import { useRouter } from 'vue-router';
import { useReferer } from '@/hooks';

/**
 * @param {String} defaultUrl 
 * @param {Record<String, String>} options 
 * @returns 
 */
export function useRedirect (defaultUrl, options = {}) {
    const { referer, options: refererOptions } = useReferer();
    const $router = useRouter();

    return {
        redirect() {
            if (referer.value) {
                $router.push({
                    [referer.value.substr(0, 1) === '/' ? 'path' : 'name']: referer.value,
                    ...refererOptions.value
                });
            } else {
                $router.push({
                    [defaultUrl.substr(0, 1) === '/' ? 'path' : 'name']: defaultUrl,
                    ...options
                });
            }
        }
    };
}