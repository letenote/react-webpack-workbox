if (typeof importScripts === 'function') {
  // see doc => https://developers.google.com/web/tools/workbox/modules/workbox-sw
  // workbox ver 5 release
  // importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');
  // workbox ver 6 release
  importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.2/workbox-sw.js');
  /* global workbox */
  if (workbox) {
    console.log('Workbox is loaded');
    workbox.setConfig({
      debug: true
    })

    workbox.core.setCacheNameDetails({
      prefix: 'custom-my-app',
      suffix: 'custom-v1',
      precache: 'custom-precache-name',
      runtime: 'custom-runtime-name',
      googleAnalytics: 'custom-google-analytics-name'
    });
    // workbox ver 5 release
    // workbox.core.skipWaiting();
    // workbox ver 6 release
    // update skipWaiting()
    addEventListener('message', (event) => {
      if (event.data && event.data.type === 'SKIP_WAITING') {
        skipWaiting();
      }
    });
    workbox.routing.registerRoute(
      ({request}) => request.destination === 'image' || request.destination === 'font',
      new workbox.strategies.CacheFirst()
    );
    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

    /* custom cache rules */
     workbox.routing.registerRoute(
      new workbox.routing.NavigationRoute(
        new workbox.strategies.NetworkFirst({
          cacheName: 'custom-register-route-name',
        })
      )
    );
  } else {
    // console.log('Workbox could not be loaded. No Offline support');
  }
}