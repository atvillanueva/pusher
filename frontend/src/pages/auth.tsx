import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "react-use";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { deviceInterest, beamsTokenProvider, beamsClient } from "../services/pusher";

export function Component() {
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useSessionStorage('userId', '');
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    
    try {
      const serviceWorkerRegistration = await window.navigator.serviceWorker
        .ready;
      const client = beamsClient(serviceWorkerRegistration);

      await client.start();
      await client.setUserId(userId, beamsTokenProvider);
      await client.addDeviceInterest(deviceInterest);

      navigate("/messages");
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <Stack component="form" onSubmit={handleSubmit} alignItems="center" gap={2}>
      <TextField
        value={userId}
        onChange={handleChange}
        label="User Id"
        placeholder="Enter your user ID"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button variant="contained" type="submit" disabled={userId.length === 0 || isLoading}>
        Submit
      </Button>
    </Stack>
  );
}

Component.displayName = "AuthPage";
