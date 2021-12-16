import { ref, reactive, computed } from 'vue';

/**
 * @var {{ value: String }} refererUrl
 */
const refererUrl = ref('');
 /**
  * @var {{ value: String }} refererUrl
  */
const refererOptions = reactive({
    options: {}
});

/**
 * @param {String} referer 
 * @param {Record<String, String>} options 
 */
const setReferer = (referer, options = {}) => {
    refererUrl.value = referer;
    refererOptions.options = { ...options };
};

export function useReferer() {
    return {
        referer: computed(() => refererUrl.value),
        options: computed(() => refererOptions.options),

        setReferer,
        setRefererWithCurrentRoute($route, defaultRedirect = 'Home') {
            const name = (['Account', 'CreateApp', 'MyApps']
                .indexOf($route.name) === -1 ? 
                    $route.name 
                        : defaultRedirect);
            
            setReferer(name, {
                params: $route.params
            });
        }
    }
}