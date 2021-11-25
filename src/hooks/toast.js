import { reactive, computed } from 'vue';

const toast = reactive({
    opened: false,
    message: '',
    duration: 2000
});

export const useToast = () => {
    const props = Object.keys(toast).reduce((r, c) => ({ ...r, [c]: computed(() => toast[c]) }), {});

    const methods = Object.keys(toast).reduce((r, c) => ({ ...r, [`set${c.substr(0, 1).toUpperCase()}${c.substr(1, c.length - 1)}`]: v => {
        toast[c] = v;
    }}), {});

    return {
        toast: computed(() => toast),
        ...props,
        ...methods
    }
}