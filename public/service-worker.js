// TODO bug sur le revoie de connection lost lorsqu'une page n'est pas trouvé hors connexion
const CACHE_NAME = 'play-private-store';

const PAGES = [
  '/',
  '/signin',
  '/signup',
  '/account',
  '/my-apps',
  '/apps',
  '/create-app',
  '/about',
  '/connection-lost'
];

workbox.core.setCacheNameDetails({prefix: "play-private-store"});

self.addEventListener("install", (event) => {
  // Installation du service worker
  event.waitUntil(
    // On utillise le cache des assets
    caches.open(CACHE_NAME)
      .then(function(cache) {
        // On pre-cache tous nos assets utiles
        return cache.addAll(PAGES);
      })
  );
  self.skipWaiting();
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', function(event) {
  //console.log('Gestion de l\'évènement de fetch pour', event.request.url);

  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        //console.log('Réponse trouvée en cache:', response);

        return response;
      }
      //console.log('Pas de réponse trouvée en cache. Sur le point de la récupérer via le réseau...');

      return fetch(event.request).then(function(response) {
        //console.log('La réponse du réseau est:', response);

        if(!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        var responseToCache = response.clone();

        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, responseToCache);
        });

        return response;
      }).catch(function(error) {
        //console.error('Récupération échouée:', error);

        // throw error;

        caches.match('/connection-lost').then(function(cacheResponse) {
          if (cacheResponse) {
            return cacheResponse;
          }

          throw error;
        });
      });
    })
  );
});

self.onnotificationclick = event => {
  console.log('On notification click: ', event.notification.tag)
  // event.notification.close()

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(
    clients
      .matchAll({ type: 'window' })
      .then(clientList => {
        for (let i = 0; i < clientList.length; i++) {
          const client = clientList[i];

          if (event.notification.tag.indexOf('app-created') !== -1 || event.notification.tag.indexOf('comment-created') !== -1) {
            client.postMessage(JSON.stringify({
              channel: 'notificationClick',
              action: 'redirect',
              routerConfig: {
                name: 'ShowApp',
                params: {
                  appid: parseInt(event.notification.tag.split('-')[event.notification.tag.split('-').length - 1])
                }
              }
            }));
          }
        }
      })
  );
};

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
