
import Pusher from 'pusher-js';
import * as PusherPushNotifications from "@pusher/push-notifications-web";

const key = "7ebdb44a3a3f82f582c2"
const cluster = "ap1"
const instanceId = "5b786809-7ea2-41c1-811d-b6afb078474f";

export const deviceInterest = "messages";

export const pusher = new Pusher(key, {
  cluster
});

export const beamsTokenProvider = new PusherPushNotifications.TokenProvider({
  url: '/api/pusher/beams-auth',
});

export const beamsClient = (serviceWorkerRegistration: ServiceWorkerRegistration) => new PusherPushNotifications.Client({
  serviceWorkerRegistration: serviceWorkerRegistration,
  instanceId,
});