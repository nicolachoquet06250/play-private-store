import { reactive, computed } from 'vue';


const toast = reactive({
    opened: false,
    message: '',
    duration: 2000
});

const setMessage = message => {
    toast.message = message;
};
const setDuration = duration => {
    toast.duration = duration;
};
const setOpened = opened => {
    toast.opened = opened;
};

export const useToast = () => ({
    toast: computed(() => toast),

    setMessage,
    setDuration,
    setOpened,

    openToast(message, duration = 2000) {
        setMessage(message);
        setDuration(duration);
        setOpened(true);

        setTimeout(() => {
            setOpened(false);
        }, duration);
    }
});