const Pusher = require("pusher");

const appId = "1730930";
const key = "7ebdb44a3a3f82f582c2";
const secret = "ce37f5d0f3279aaff0e2";
const cluster = "ap1";
const channelName = "my-channel";
const eventName = "my-event";

const pusher = new Pusher({
  appId,
  key,
  secret,
  cluster,
});

pusher.trigger(channelName, eventName, "Hello World!");
