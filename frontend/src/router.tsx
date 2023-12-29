import { createBrowserRouter, Navigate } from "react-router-dom";

import RootLayout from "./layouts/root";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "auth",
        lazy: () => import("./pages/auth"),
      },
      {
        path: "messages",
        lazy: () => import("./pages/messages"),
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="messages" replace />,
  },
]);

export default router;
