import { useGuest, useToast, useApp } from '@/hooks';

const { openToast } = useToast();

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

    const { type: subType, appId, appName, users } = data;

    const concerned = users.indexOf(guest.value.id) !== -1;

    if (concerned) {
        const { app } = useApp(parseInt(appId));
        const name = app.value ? app.value.name : appName;
        openToast(`L'application ${name} ${subType === 'updated' ? `vient d'être mise à jour` : 'vient de sortir'}`, 4000);
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