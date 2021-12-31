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
    }
});