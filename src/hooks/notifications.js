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
    create({ title, text, logo, tag, onClick, onClose, onError, onShow }) {
        askNotificationPermission().then(r => {
            if (r === 'granted') {
                logo = logo ?? '/img/icons/favicon-32x32.png';
                onClick = onClick ?? null;
                onClose = onClose ?? null;
                onError = onError ?? null;
                onShow = onShow ?? null;

                const n = new Notification(title, { 
                    body: text, 
                    icon: logo, 
                    tag
                });

                if (onClick) n.onclick = onClick;
                if (onClose) n.onclose = onClose;
                if (onError) n.onerror = onError;
                if (onShow) n.onshow = onShow;
            }
        });
    },

    createFromServiceWorker({ title, text, logo, tag }, cb) {
        const handler = r => {
            if (r === 'granted') {
                const run = () => {
                    logo = logo ?? '/img/icons/favicon-32x32.png';

                    serviceWorkerRegistration.value?.showNotification(
                        title, {
                            body: text,
                            icon: logo,
                            tag
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

navigator.serviceWorker.onmessage = messageEvent => {
    const { channel, action, routerConfig } = JSON.parse(messageEvent.data);
    console.log(JSON.parse(messageEvent.data));

    switch (channel) {
        case 'notificationClick':
            if (action === 'redirect') {
                localStorage.setItem('last_appid', routerConfig.params.appid);
                window.location.href = '/app/' + routerConfig.params.appid;
            }

            break;

        default: break;
    }
};