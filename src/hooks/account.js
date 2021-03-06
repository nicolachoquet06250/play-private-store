// https://github.com/nicolachoquet06250/budget-management-apk/releases/download/0.1.0/budget-management-0-1-0.apk
// https://github.com/nicolachoquet06250/{repo-name}/releases/download/{version}/{app-name-slug}-{version-with-scores}.apk

import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useReferer, useRedirect, useTranslate, useLoader, usePPS } from '@/hooks';

const isSignedIn = ref(false);
const guest = ref(null);

const users = ref([
    /*{ 
        id: 0,
        firstname: 'Nicolas',
        lastname: 'Choquet',
        email: 'nchoquet@norsys.fr',
        repo_pseudo: {
            github: 'nicolachoquet06250',
            gitlab: 'nicolachoquet06250'
        },
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
        password: 'grafikart'
    }*/
]);
const error = ref(false);
const initialized = ref(false);

export function useGuest() {
    const $route = useRoute();
    const { redirect } = useRedirect();
    const { __ } = useTranslate();
    const { showLoader, hideLoader } = useLoader();
    const { getUsers } = usePPS();

    if (!initialized.value) {
        getUsers('', {}, {
            before: showLoader,
            after(_users, error) {
                if (error.value === null) {
                    users.value = _users.value;
                    initialized.value = true;
                }
                hideLoader();
            }
        });
    }
    
    return {
        isSignedIn: computed(() => isSignedIn.value),
        guest: computed(() => 
            users.value.reduce((r, c) => 
                c.id === guest.value 
                    ? c : r, null)),
        users: computed(() => users.value),
        error: computed(() => error.value),

        update(id, accountData) {
            users.value = users.value.reduce((r, c) => {
                if (c.id === id) {
                    return [...r, {
                        ...c,
                        ...accountData
                    }]
                } else {
                    return [...r, c];
                }
            }, []);
        },

        user(id) {
            return computed(
                () => users.value.reduce(
                    (r, c) => (c.id === id ? c : r), 
                    null
                )
            );
        },
        signIn(email, password, keepConnect, _redirect = null) {
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
                error.value = __('hooks.account.errorIdentsNotMatch', 'Vos identifiants ne correspondent pas !')
            }
        },
        signOut() {
            const { setRefererWithCurrentRoute } = useReferer();
            
            isSignedIn.value = false;

            setRefererWithCurrentRoute($route);
            redirect();
        },
        /**
         * @param {{ firstname: String, lastname: String, email: String, repo_pseudo: { github: String, gitlab: String }, password: String }} user 
         */
        createAccount(user) {
            if (user) {
                //eslint-disable-next-line
                if (!user.email.match(/[a-z0-9\.\-\_]+\@[a-z\-\_]+\.[a-z]+$/)) {
                    throw new Error(__('hooks.account.errorBadEmailFormat', `L'email renseign?? n'est pas au bon format`));
                }

                if (users.value.reduce((r, c) => c.email === user.email ? true : r, false)) {
                    throw new Error(__('hooks.account.errorEmailAlreadyExists', `L'email renseign?? existe d??j??, veuillez en saisir un autre ou vous connecter avec celui-ci`));
                }

                users.value = [...users.value, user];
            }
        }
    };
}