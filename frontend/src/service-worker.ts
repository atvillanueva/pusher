importScripts("https://js.pusher.com/beams/service-worker.js");

window.navigator.serviceWorker.ready.then(serviceWorkerRegistration =>
  const beamsClient = new PusherPushNotifications.Client({
    instanceId: '<YOUR_INSTANCE_ID_HERE>',
    serviceWorkerRegistration: serviceWorkerRegistration,
  })
)