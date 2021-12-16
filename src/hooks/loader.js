import { ref, computed } from 'vue';

const show = ref(false);

export function useLoader() {
    return {
        show: computed(() => show.value),
        showLoader() {
            show.value = true;
        },
        hideLoader() {
            show.value = false;
        }
    }
}