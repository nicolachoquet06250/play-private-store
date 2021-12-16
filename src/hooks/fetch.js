import { ref, computed } from 'vue';

/**
 * @param {String} url
 * @param {Record<string, any>} options
 * @param {Record<'before'|'after', () => void>} actions
 * @returns {Promise<Record<'data'|'error', { value: Record<string, any>|string|null }>>}
 */
export async function useFetch(url, options = {}, actions = {}) {
    actions.before?.(url);
    const data = ref({});
    const error = ref(null);

    try {
        const response = await fetch(url, options);
        data.value = await response.json();

        //console.log(url, actions.after);
        actions.after?.(data.value, error.value, url);

        return { 
            data: computed(() => data.value), 
            error: computed(() => error.value) 
        };
    } catch (err) {
        //console.log(url, actions.after);
        actions.after?.(data.value, error.value, url);

        return { 
            data: computed(() => data.value), 
            error: computed(() => error.value)
        };
    }
}

/**
 * @param {String} url
 * @param {Record<string, any>} options
 * @param {Record<'before'|'after', ((data: Record<String, any>, url: String, isError: boolean) => void)|((err: Record<String, any>, url: String, isError: boolean) => void)|((url: String) => void)>} actions
 * @returns {Record<'data'|'error', { value: Record<string, any>|string|null }>}
 */
export function useFetchSync(url, options = {}, actions = {}) {
    const data = ref({});
    const error = ref(null);

    actions?.before(url);

    fetch(url, options)
        .then(r => r.json())
        .then(json => {
            data.value = json;
            actions?.after(json, url, false);
        })
        .catch(err => {
            error.value = err;
            actions?.after(err, url, true)
        });

    return { error: computed(() => error.value), data: computed(() => data.value) }
}

/**
 * @param {String|Function} url
 * @param {Record<string, any>} options
 * @param {Record<'before'|'after', () => void>} actions
 * @returns {(uri: String) => Promise<Record<String, any>>}
 */
export function createFetch(url, options = {}, actions = {}) {
    const _url = typeof url === 'string' ? url : url();
    return {
        /**
         * @param {String} uri 
         * @returns {Promise<Record<'data'|'error', { value: Record<string, any>|string|null }>>}
         */
        useFetch: async (uri, complementarOptions, _actions) => await useFetch(`${_url}${uri && uri !== '' ? `${_url.substr(-1) === '/' ? '' : '/'}${uri}` : ''}`, { 
            ...options, 
            ...complementarOptions,
            [options.method.toLowerCase() === 'get' ? false : 'body']: (() => {
                let _options = {};

                if (typeof options === 'object' && 'body' in options) {
                    _options = { ..._options, ...(typeof options.body === 'string' ? JSON.parse(options.body) : options.body) };
                }

                if (typeof complementarOptions === 'object' && 'body' in complementarOptions) {
                    _options = { ..._options, ...(typeof complementarOptions.body === 'string' ? JSON.parse(complementarOptions.body) : complementarOptions.body) };
                }

                return _options;
            })() 
        }, { ...actions, ..._actions }),
        /**
         * @param {String} uri 
         * @returns {Record<'data'|'error', { value: Record<string, any>|string|null }>}
         */
        useFetchSync: (uri, complementarOptions, _actions) => useFetchSync(`${_url}${uri && uri !== '' ? `${_url.substr(-1) === '/' ? '' : '/'}${uri}` : ''}`, { 
            ...options, 
            ...complementarOptions,
            body: (() => {
                let _options = {};

                if (typeof options === 'object' && 'body' in options) {
                    _options = { ..._options, ...(typeof options.body === 'string' ? JSON.parse(options.body) : options.body) };
                }

                if (typeof complementarOptions === 'object' && 'body' in complementarOptions) {
                    _options = { ..._options, ...(typeof complementarOptions.body === 'string' ? JSON.parse(complementarOptions.body) : complementarOptions.body) };
                }

                return _options;
            })() 
        }, { ...actions, ..._actions })
    };
}