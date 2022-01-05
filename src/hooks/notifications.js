import { ref, watch } from 'vue';

const serviceWorkerIsReady = ref(false);
const serviceWorkerRegistration = ref(null);
const notifications = ref([]);

export const setServiceWorkerReady = () => {
    serviceWorkerIsReady.value = true;
};

export const setServiceWorkerRegistration = registration => {
    serviceWorkerRegistration.value = registration;
}

const checkNotificationPromise = () => {
    try {
        Notification.requestPermission().then();
    } catch (e) {
        return false;
    }

    return true;
};

const askNotificationPermission = () =>  new Promise((resolve, reject) => {
    // Vérifions si le navigateur prend en charge les notifications
    if ('Notification' in window) {
        checkNotificationPromise() 
            ? Notification.requestPermission().then(resolve) 
                : Notification.requestPermission(resolve);
    } else {
        reject({
            message: 'les notifications ne sont pas prises en charge par votre navigateur'
        });
    }
});

export const useNotif = () => ({
    create(titre) {
        askNotificationPermission().then(r => {
            if (r === 'granted') {
                const img = '/img/icons/favicon-32x32.png';
                const text = 'Coucou ! Votre tâche "' + titre + '" arrive maintenant à échéance.';
                return new Notification('Liste de trucs à faire', { body: text, icon: img });
            }
        });
    },
    createFromServiceWorker({ title, text, logo }, cb) {
        const handler = r => {
            if (r === 'granted') {
                const run = () => {
                    logo = logo ?? '/img/icons/favicon-32x32.png';

                    serviceWorkerRegistration.value?.showNotification(
                        title, {
                            body: text,
                            icon: logo
                        }
                    );
                };
                cb ? cb({ run }) : run();
            }
        };

        if (!serviceWorkerIsReady.value) {
            notifications.value = [...notifications.value, () => {
                askNotificationPermission().then(handler);
            }];
        } else {
            askNotificationPermission().then(handler);
        }
    }
});

document.addEventListener('service-worker-ready', ({ detail: { registration } }) => {
    setServiceWorkerRegistration(registration);
    setServiceWorkerReady();
});

watch(serviceWorkerIsReady, () => {
    if (serviceWorkerIsReady.value) {
        notifications.value.map(notification => notification());
        notifications.value = [];
    }
});