import { useState, useEffect } from "react";
import { useSessionStorage } from "react-use";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { pusher } from "../services/pusher";

interface Message {
  userId: string;
  content: string;
}

const channelName = "messages";
const eventName = "new-message";

export function Component() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [userId] = useSessionStorage("userId");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: message,
          userId,
        }),
      });
      const json = await response.json();
      console.log(json);
      setIsLoading(false);
      setMessage('');
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    const channel = pusher.subscribe(channelName);

    channel.bind(eventName, (newMessage: Message) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      pusher.unsubscribe(channelName);
    };
  }, []);

  return (
    <Stack useFlexGap gap={4}>
      <pre>{JSON.stringify(messages, null, 2)}</pre>
      <Stack
        component="form"
        onSubmit={handleSubmit}
        alignItems="center"
        gap={2}
      >
        <TextField
          value={message}
          onChange={handleChange}
          label="Message"
          placeholder="Enter your message"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button
          variant="contained"
          type="submit"
          disabled={message.length === 0 || isLoading}
        >
          Submit
        </Button>
      </Stack>
    </Stack>
  );
}

Component.displayName = "MessagesPage";
