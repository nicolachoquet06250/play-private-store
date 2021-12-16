import { computed, ref } from "vue";
import { useGuest, useLoader, usePPS } from '@/hooks';

const appList = ref([
    /*{
        id: 0,
        repo_type: GITHUB,
        name: 'Budget Management 1',
        nameSlug: 'budget-management',
        repoName: 'budget-management-apk',
        logo: 'https://thumbs.dreamstime.com/z/vecteur-d-ic%C3%B4ne-de-calcul-argent-budget-encaissant-le-logo-illustration-symbole-financier-paiement-152384739.jpg',
        version: '0.1.0',
        versionSlug: '0-1-0',
        description: `apks signés générés pour l'application budget-management`,
        stars: 3.5,
        screenshots: [],
        permissions: [],
        categories: [
            'budget',
            'budgetaire',
            'monnaitaire',
            'argent',
            
        ],
        comments: [
            {
                author: 1,
                comment: 'Je suis très satisfait de cette application.',
                note: 3.5,
                date: '2021-11-24'
            }
        ],
        author: 0
    },
    {
        id: 1,
        repo_type: GITHUB,
        name: 'Budget Management 2',
        nameSlug: 'budget-management',
        repoName: 'budget-management-apk',
        logo: 'https://thumbs.dreamstime.com/z/vecteur-d-ic%C3%B4ne-de-calcul-argent-budget-encaissant-le-logo-illustration-symbole-financier-paiement-152384739.jpg',
        version: '0.1.0',
        versionSlug: '0-1-0',
        description: `apks signés générés pour l'application budget-management`,
        stars: 4,
        screenshots: [],
        permissions: [],
        categories: [
            'budget',
            'budgetaire',
            'monnaitaire'
        ],
        comments: [
            {
                author: 0,
                comment: 'Je suis très satisfait de cette application.',
                note: 4,
                date: '2021-11-24'
            }
        ],
        author: 1
    },
    {
        id: 2,
        repo_type: GITLAB,
        name: 'Budget Management 3',
        nameSlug: 'budget-management',
        repoName: 'budget-management-apk',
        logo: 'https://thumbs.dreamstime.com/z/vecteur-d-ic%C3%B4ne-de-calcul-argent-budget-encaissant-le-logo-illustration-symbole-financier-paiement-152384739.jpg',
        version: '0.1.0',
        versionSlug: '0-1-0',
        description: `apks signés générés pour l'application budget-management`,
        stars: 2.5,
        screenshots: [],
        permissions: [],
        categories: [
            'budget',
            'budgetaire',
            'monnaitaire'
        ],
        comments: [
            {
                author: 1,
                comment: 'Je suis très satisfait de cette application.',
                note: 2.5,
                date: '2021-11-24'
            }
        ],
        author: 0
    },*/
]);
const initialized = ref(false);

/*const slugify = value => value.replace(/\./g, '-')
    .replace(/ /g, '-')
    .replace(/'/g, '-');*/

export function useApps() {
    const { guest } = useGuest();
    const { showLoader, hideLoader } = useLoader();
    const { getApps, createApp, deleteApp } = usePPS();

    if (!initialized.value) {
        getApps('', {}, {
            before: showLoader,
            after(apps, error) {
                if (error.value === null) {
                    appList.value = apps.value;
                    initialized.value = true;
                }
                hideLoader();
            }
        });
    }

    return {
        list: computed(() => appList.value),
        myList: computed(() => {
            return appList.value.reduce((r, c) => 
                c.author === guest.value?.id ? [...r, c] : r, [])
        }),
    
        /**
         * @param {String} version version de l'application
         * @param {'github'|'gitlab'} repo_type de répository utilisé
         * @param {String} name nom de l'application
         * @param {String} repoName nom du répo git
         * @param {String} logo vers le logo de l'application
         * @param {String} description desription de l'application
         * @param {Array<String>} screenshots screenshots de l'application afin d'avoir un apercu
         * @param {Array<String>} permissions permissions demandées à l'utilisateur par l'application pour qu'il soit au courrent avant de l'installée
         * @param {Array<String>} categories catégories de l'application pour faciliter la recherche
         */
        createApp(version, repoType, name, repoName, logo, description, screenshots, permissions, categories) {
            createApp(version, repoType, name, repoName, logo, description, screenshots, permissions, categories)('', {
                body: { author: guest.value.id }
            }, {
                before: showLoader,
                after(data, error) {
                    if (error.value === null) {
                        appList.value = [...appList.value, data.value.app]
                    }
                }
            })
        },
    
        /**
         * @param {Number} id 
         */
        deleteApp(id) {
            deleteApp(id, {}, {
                before: showLoader,
                after(apps, error) {
                    if (error.value === null) {
                        appList.value = apps.value;
                    }
                    hideLoader();
                }
            })
            //appList.value = appList.value.reduce((r, c) => c.id !== id ? [...r, c] : r);
        }
    }
}

export const useApp = id => {
    const { guest } = useGuest();
    const { showLoader, hideLoader } = useLoader();
    const { createComment } = usePPS();
    
    return {
        app: computed(() => 
            appList.value.reduce((r, c) => 
                c.id === id ? c : r, null)
        ),
    
        createComment(message, note) {
            createComment(id, message, note)('', {
                body: {
                    author: guest.value.id
                }
            }, {
                before: showLoader,
                after(data, error) {
                    if (error.value === null && Object.keys(data.value).length > 0) {
                        appList.value = appList.value.reduce((r, c) => c.id === id ? [...r, data.value.app] : [...r, c], []);
                    }
                    hideLoader();
                }
            })
        }
    }
}