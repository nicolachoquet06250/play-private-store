import { computed, ref } from "vue";
import { useGuest } from '@/hooks';

const appList = ref([
    {
        id: 0,
        name: 'Budget Management',
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
            'monais'
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
        name: 'Budget Management',
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
        name: 'Budget Management',
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
    },
]);

const slugify = value => value.replace(/\./g, '-').replace(/ /g, '-');

export const useApps = () => {
    const { guest } = useGuest();

    return {
        list: computed(() => appList.value),
        myList: computed(() => {
            return appList.value.reduce((r, c) => 
                c.author === guest.value?.id ? [...r, c] : r, [])
        }),
    
        /**
         * @param {String} version version de l'application
         * @param {String} name nom de l'application
         * @param {String} repoName nom du répo git
         * @param {String} logo vers le logo de l'application
         * @param {String} description desription de l'application
         * @param {Array<String>} screenshots screenshots de l'application afin d'avoir un apercu
         * @param {Array<String>} permissions permissions demandées à l'utilisateur par l'application pour qu'il soit au courrent avant de l'installée
         * @param {Array<String>} categories catégories de l'application pour faciliter la recherche
         */
        createApp(version, name, repoName, logo, description, screenshots, permissions, categories) {
            const lastApp = appList.value.reduce((r, c) => c, null);
            
            appList.value = [...appList.value, {
                id: (lastApp?.id ?? 0) + 1,
                name,
                nameSlug: slugify(name),
                repoName,
                logo,
                version,
                versionSlug: slugify(version),
                stars: 0,
                description,
                screenshots,
                permissions,
                categories,
                comments: [],
                author: guest.value.id
            }]
        },
    
        /**
         * @param {Number} id 
         */
        deleteApp(id) {
            appList.value = appList.value.reduce((r, c) => c.id !== id ? [...r, c] : r);
        }
    }
};

export const useApp = id => ({
    app: computed(() => 
        appList.value.reduce((r, c) => 
            c.id === id ? c : r, null)
    )
});