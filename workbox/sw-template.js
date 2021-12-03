if (typeof importScripts === 'function') {
  // workbox ver 5 release
  // importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');
  // workbox ver 6 release
  importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.2/workbox-sw.js');
  /* global workbox */
  if (workbox) {
    console.log('Workbox is loaded');
    // workbox ver 5 release
    // workbox.core.skipWaiting();
    // workbox ver 6 release
    // update skipWaiting()
    addEventListener('message', (event) => {
      if (event.data && event.data.type === 'SKIP_WAITING') {
        skipWaiting();
      }
    });

    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

    /* custom cache rules */
     workbox.routing.registerRoute(
      new workbox.routing.NavigationRoute(
        new workbox.strategies.NetworkFirst({
          cacheName: 'PRODUCTION',
        })
      )
    );
  } else {
    // console.log('Workbox could not be loaded. No Offline support');
  }
}