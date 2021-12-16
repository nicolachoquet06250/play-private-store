import { ref, reactive } from 'vue';

const ws = ref(null);
const connected = ref(false);
const callbacks = reactive({});

export function useWebsocket(url) {
    return {
        connect() {
            if (!ws.value) {
                const protocol = window.location.protocol.indexOf('https') !== -1 ? 'wss' : 'ws';
                ws.value = new WebSocket(`${protocol}://${url}`);
                connected.value = true;
    
                if (Object.keys(callbacks).length > 0) {
                    for (const key of Object.keys(callbacks)) {
                        ws.value?.addEventListener(key, (...args) => callbacks[key](ws.value, ...args));
                    }
                }
            }
    
            return ws.value;
        },
    
        disconnect() {
            if (ws.value) {
                if (Object.keys(callbacks).length > 0) {
                    for (const key of Object.keys(callbacks)) {
                        ws.value?.removeEventListener(key, (...args) => callbacks[key](ws.value, ...args));
                    }
                }
    
                ws.value.close();
                ws.value = null;
                connected.value = false;
            }
        },
    
        addWsEventListener(event, callback) {
            if (callbacks[event]) {
                ws.value?.removeEventListener(event, (...args) => callbacks[event](ws.value, ...args));
            }
    
            callbacks[event] = callback;
            ws.value?.addEventListener(event, (...args) => callbacks[event](ws.value, ...args));
        }
    }
}
