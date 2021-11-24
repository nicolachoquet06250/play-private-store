import { computed, ref } from "vue";
import { useGuest } from './account';

const appList = ref([
    {
        id: 0,
        name: 'Budget Management',
        logo: 'https://thumbs.dreamstime.com/z/vecteur-d-ic%C3%B4ne-de-calcul-argent-budget-encaissant-le-logo-illustration-symbole-financier-paiement-152384739.jpg',
        version: '1.0.0',
        apkUrl: 'https://github.com/nicolachoquet06250/budget-management-apk/releases/download/0.1.0/budget-management-0-1-0.apk',
        description: `apks signés générés pour l'application budget-management`,
        stars: 3.5,
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
                note: '2.5',
                date: '2021-11-24'
            }
        ],
        author: 0
    }
]);

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
         * @param {String} url vers le logo de l'application
         * @param {String} apkUrl url vers l'apk afin de pouvoir le télécharger
         * @param {String} description desription de l'application
         * @param {Array<String>} screenshots screenshots de l'application afin d'avoir un apercu
         * @param {Array<String>} permissions permissions demandées à l'utilisateur par l'application pour qu'il soit au courrent avant de l'installée
         * @param {Array<String>} categories catégories de l'application pour faciliter la recherche
         */
        createApp(version, name, logo, apkUrl, description, screenshots, permissions, categories) {
            appList.value = [...appList.value, {
                id: (appList.value[appList.value.length - 1]?.id ?? 0),
                name,
                logo,
                version,
                apkUrl,
                stars: 0,
                description,
                screenshots,
                permissions,
                categories,
                comments: [],
                author: guest.value
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