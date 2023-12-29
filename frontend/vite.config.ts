import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "inline",
      workbox: {
        importScripts: ["https://js.pusher.com/beams/service-worker.js"],
      },
    }),
  ],
  server: {
    port: 3000,
    host: true,
    proxy: {
      "/api/": "http://localhost:3001/",
    },
  },
  preview: {
    port: 5000,
  },
});
