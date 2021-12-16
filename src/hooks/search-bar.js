import { ref, computed } from 'vue';

const showSearchbar = ref(true);

export function useSearchbar() {
    return {
        showed: computed(() => showSearchbar.value),
    
        show() {
            showSearchbar.value = true;
        },
        hide() {
            showSearchbar.value = false;
        }
    }
}