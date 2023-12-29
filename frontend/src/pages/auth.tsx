import { useState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// import { beamsClient } from "../services/pusher";
import useUserId from '../hooks/use-user-id';

export function Component() {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [, setUserId] = useUserId();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    
    try {
      // const serviceWorkerRegistration = await window.navigator.serviceWorker
      //   .ready;
      // const client = beamsClient(serviceWorkerRegistration);

      // await client.start();

      // await client.setUserId(userId, beamsTokenProvider);
      // await client.addDeviceInterest(deviceInterest);

      setUserId(inputValue);

      window.location.href = '/messages';
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <Stack component="form" onSubmit={handleSubmit} alignItems="center" gap={2}>
      <TextField
        value={inputValue}
        onChange={handleChange}
        label="User Id"
        placeholder="Enter your user ID"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button variant="contained" type="submit" disabled={inputValue.length === 0 || isLoading}>
        Submit
      </Button>
    </Stack>
  );
}

Component.displayName = "AuthPage";
