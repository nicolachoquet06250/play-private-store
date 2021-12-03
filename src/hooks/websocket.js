import { ref, reactive } from 'vue';

const ws = ref(null);
const callbacks = reactive({});

export const useWebsocket = url => ({
    connect() {
        if (!ws.value) {
            ws.value = new WebSocket(`ws://${url}`);
        }

        return ws.value;
    },

    disconnect() {
        if (ws.value) {
            ws.value.close();
        }
    },

    addWsEventListener(event, callback) {
        if (callbacks[event]) {
            ws.value.removeEventListener(event, (...args) => callbacks[event](ws.value, ...args));
        }

        callbacks[event] = callback;
        ws.value.addEventListener(event, (...args) => callbacks[event](ws.value, ...args));
    }
});
