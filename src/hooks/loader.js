import { ref, computed } from 'vue';

const show = ref(false);

export const useLoader = () => ({
    show: computed(() => show.value),
    showLoader() {
        show.value = true;
    },
    hideLoader() {
        show.value = false;
    }
});