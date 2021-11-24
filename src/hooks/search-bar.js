import { ref, computed } from 'vue';

const showSearchbar = ref(true);

export const useSearchbar = () => ({
    showed: computed(() => showSearchbar.value),

    show() {
        showSearchbar.value = true;
    },
    hide() {
        showSearchbar.value = false;
    }
});