const express = require("express");
const bodyParser = require("body-parser");
const Pusher = require("pusher");
const PushNotifications = require("@pusher/push-notifications-server");

const port = 3001;
const app = express();

const appId = "1730930";
const key = "7ebdb44a3a3f82f582c2";
const secret = "ce37f5d0f3279aaff0e2";
const cluster = "ap1";
const channelName = "messages";
const eventName = "new-message";

const pusher = new Pusher({
  appId,
  key,
  secret,
  cluster,
});

const instanceId = "5b786809-7ea2-41c1-811d-b6afb078474f";
const secretKey =
  "837C3418200B702534A726A9A4728C3AFB6E0D997868B018B85E9EBEE9707959";
const publishInterests = ["messages"];

const beamsClient = new PushNotifications({
  instanceId,
  secretKey,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/pusher/beams-auth", (req, res) => {
  const userIDInQueryParam = req.query.user_id;
  const beamsToken = beamsClient.generateToken(userIDInQueryParam);
  res.json(beamsToken);
});

app.post("/api/messages", async (req, res) => {
  try {
    const { userId, content } = req.body;

    await pusher.trigger(channelName, eventName, { userId, content });
    await beamsClient.publishToInterests(publishInterests, {
      web: {
        notification: {
          title: "New message",
          body: content,
        },
      },
    });

    res.status(201).json({ userId, content });
  } catch (error) {
    res.status(500).json(error);
  }
});

app.listen(port, () => {
  console.log(`api-server listening at http://localhost:${port}`);
});
