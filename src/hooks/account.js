import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const isSignedIn = ref(false);
const guest = ref(null);
// https://github.com/nicolachoquet06250/budget-management-apk/releases/download/0.1.0/budget-management-0-1-0.apk
// https://github.com/nicolachoquet06250/{repo-name}/releases/download/{version}/{app-name-slug}-{version-with-scores}.apk

const users = ref([
    { 
        id: 0,
        firstname: 'Nicolas',
        lastname: 'Choquet',
        email: 'nchoquet@norsys.fr',
        github: 'https://github.com/nicolachoquet06250',
        password: 'nchoquet'
    },
    {
        id: 1,
        firstname: 'Jonhatan',
        lastname: 'Boyer',
        email: 'jboyer@norsys.fr',
        github: 'https://github.com/grafikart',
        password: 'grafikart'
    }
]);

const error = ref(false);

export const useGuest = () => {
    const $router = useRouter();
    const $route = useRoute();

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
        signIn(email, password, redirect) {
            console.log(email, password);

            guest.value = users.value.reduce((r, c) => c.email === email && c.password === password ? c.id : r, null);

            if (guest.value !== null) {
                isSignedIn.value = true;
                $router.push({ name: redirect });
                error.value = false;
            } else {
                isSignedIn.value = false;
                error.value = 'Vos identifiants ne correspondent pas !'
            }
        },
        signOut(redirect) {
            isSignedIn.value = false;

            $router.push({ 
                name: (['Account', 'CreateApp', 'MyApps']
                    .indexOf($route.name) === -1 ? 
                        $route.name 
                            : redirect)
            });
        }
    };
};