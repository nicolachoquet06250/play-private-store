import { ref, computed, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const isSignedIn = ref(false);
const guest = reactive({
    id: 0,
    firstname: 'Nicolas',
    lastname: 'Choquet',
    email: 'nchoquet@norsys.fr'
});

export const useGuest = () => {
    const $router = useRouter();
    const $route = useRoute();
    return {
        isSignedIn: computed(() => isSignedIn.value),
    
        guest: computed(() => {
            if (isSignedIn.value) {
                return guest;
            }
            return null;
        }),

        users: computed(() => [{ ...guest }]),
        user(id) {
            return [{ ...guest }].reduce((r, c) => 
                c.id === id ? c : r, null);
        },

        signIn(email, password, redirect) {
            console.log(email, password);

            isSignedIn.value = true;

            $router.push({
                name: redirect
            })
        },
        signOut(redirect) {
            isSignedIn.value = false;

            if (['Account', 'CreateApp', 'MyApps'].indexOf($route.name) === -1) {
                $router.push({
                    name: $route.name
                });
            } else {
                $router.push({
                    name: redirect
                });
            }
        }
    };
};