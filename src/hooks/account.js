// https://github.com/nicolachoquet06250/budget-management-apk/releases/download/0.1.0/budget-management-0-1-0.apk
// https://github.com/nicolachoquet06250/{repo-name}/releases/download/{version}/{app-name-slug}-{version-with-scores}.apk

import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useReferer, useRedirect } from '@/hooks';

const isSignedIn = ref(false);
const guest = ref(null);

const users = ref([
    { 
        id: 0,
        firstname: 'Nicolas',
        lastname: 'Choquet',
        email: 'nchoquet@norsys.fr',
        repo_pseudo: {
            github: 'nicolachoquet06250',
            gitlab: 'nicolachoquet06250'
        },
        github: 'https://github.com/nicolachoquet06250',
        password: 'nchoquet'
    },
    {
        id: 1,
        firstname: 'Jonhatan',
        lastname: 'Boyer',
        email: 'jboyer@norsys.fr',
        repo_pseudo: {
            github: 'grafikart'
        },
        github: 'https://github.com/grafikart',
        password: 'grafikart'
    }
]);

const error = ref(false);

export const useGuest = () => {
    const $route = useRoute();
    const { redirect } = useRedirect();
    
    return {
        isSignedIn: computed(() => isSignedIn.value),
        guest: computed(() => 
            users.value.reduce((r, c) => 
                c.id === guest.value 
                    ? c : r, null)),
        users: computed(() => users.value),
        error: computed(() => error.value),

        user(id) {
            return users.value.reduce((r, c) => 
                c.id === id ? c : r, null);
        },
        signIn(email, password, _redirect = null) {
            const { referer, setReferer } = useReferer();

            guest.value = users.value.reduce((r, c) => c.email === email && c.password === password ? c.id : r, null);

            if (!referer.value) {
                setReferer(_redirect);
            }

            if (guest.value !== null) {
                isSignedIn.value = true;
                error.value = false;

                redirect();
            } else {
                isSignedIn.value = false;
                error.value = 'Vos identifiants ne correspondent pas !'
            }
        },
        signOut() {
            const { setRefererWithCurrentRoute } = useReferer();
            
            isSignedIn.value = false;

            setRefererWithCurrentRoute($route);
            redirect();
        }
    };
};