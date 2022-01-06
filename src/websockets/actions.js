import { useGuest, useToast, useApp, useApps, useNotif } from '@/hooks';

const { reloadApps } = useApps();
const { openToast } = useToast();
const { createFromServiceWorker: createNotif } = useNotif();

export const ask_identity = (ws, channel, _type, data) => {
    const { guest } = useGuest();

    const { id: socketId } = data;
    
    const user = Object.keys(guest.value).reduce((r, c) => c === 'password' ? r : { ...r, [c]: guest.value[c] }, {});

    ws.send(JSON.stringify({
        channel,
        type: 'give',
        data: { user, id: socketId }
    }))
};

export const received_identity = () => {
    console.log('identitée bien reçue');
    openToast('Votre identité à bien été envoyé au serveur de notifications', 4000);
};

export const give_notify = (_ws, _channel, _type, data) => {
    const { guest } = useGuest();

    const { element, type: subType, users } = data;

    let concerned;

    if (element === 'app') {
        const { appId, appName } = data;

        switch (subType) {
            case 'updated':
                reloadApps().then(() => {
                    const { app } = useApp(appId);

                    const name = app.value ? app.value.name : appName;
                    concerned = users.indexOf(guest.value.id) !== -1;

                    if (concerned) {
                        createNotif({
                            title: 'Mise à jour',
                            text: `L'application ${name} vient d'être mise à jour`,
                            logo: app.value?.logo,
                            tag: `app-updated-${app.value?.id}`
                        });
                    }
                });
                
                // openToast(`L'application ${name} vient d'être mise à jour`, 4000);
                break;

            case 'created':
                reloadApps().then(() => {
                    const { app } = useApp(appId);

                    const name = app.value ? app.value.name : appName;
                    
                    concerned = users.indexOf(guest.value?.id) !== -1 && guest.value?.id !== app.value?.author;

                    if (concerned) {
                        createNotif({
                            title: 'Nouvelle application',
                            text: `L'application ${name} vient de sortir`,
                            logo: app.value?.logo,
                            tag: `app-created-${app.value?.id}`
                        });
                    }
                });
                // openToast(`L'application ${name} vient de sortir`, 4000);
                break;
        }
    } else if (element === 'comment') {
        const { appId } = data;

        reloadApps().then(() => {
            const { app } = useApp(appId);

            switch (subType) {
                case 'created':
                    concerned = users.indexOf(guest.value.id) !== -1 && guest.value?.id !== app.value?.author;

                    if (concerned) {
                        createNotif({
                            title: 'Nouveau commentaire',
                            text: `Un nouveau commentaire est disponnible`,
                            logo: app.value?.logo,
                            tag: `comment-created-${app.value?.id}`
                        });
                    }
                    // openToast(`L'application ${name} vient de sortir`, 4000);
                    break;
            }
        });
    }
};

export default actions => (ws, event) => {
    const { channel, type, data } = JSON.parse(event.data);
    
    if (`${type}_${channel}` in actions) {
        actions[`${type}_${channel}`](ws, channel, type, data);
    } else {
        console.log(JSON.parse(event.data))
    }
}