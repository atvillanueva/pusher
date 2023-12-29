import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

import { deviceInterest, beamsClient } from "./services/pusher.ts";
import router from "./router";


window.navigator.serviceWorker.ready.then(async (serviceWorkerRegistration) => {
  try {
    
    const client = beamsClient(serviceWorkerRegistration);
    
    await client.start();

    const currentUserId = localStorage.getItem("userId");
    console.log('currentUserId: ', currentUserId);

    await client.addDeviceInterest(deviceInterest);
  } catch (error) {
    console.log(error);
  }
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CssBaseline />
    <RouterProvider router={router} />
  </React.StrictMode>
);
