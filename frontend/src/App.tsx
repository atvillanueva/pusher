import { useState, useEffect } from "react";
import Pusher from 'pusher-js';
// import * as PusherTypes from 'pusher-js';

const key = "7ebdb44a3a3f82f582c2"
const cluster = "ap1"
const channelName = 'my-channel'
const eventName = 'my-event'

const pusher = new Pusher(key, {
  cluster
});

function App() {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const channel = pusher.subscribe(channelName);

    channel.bind(eventName, (newMessage: string) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      pusher.unsubscribe(channelName)
    }
  }, [])

  return <pre>{JSON.stringify(messages, null, 2)}</pre>
}

export default App;