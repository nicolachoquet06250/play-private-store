import { ref, computed } from 'vue';

const hasNewContent = ref(false);

const setNewContent = v => {
    hasNewContent.value = v;
}

export const useContentUpdate = () => {
    return {
        hasNewContent: computed(() => hasNewContent.value),

        setNewContent
    };
};