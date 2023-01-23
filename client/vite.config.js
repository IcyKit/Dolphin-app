import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  build: {
    outDir: "../public",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "feed.html"),
      },
    },
  },
  server: {
    proxy: {
      "/posts": "http://localhost:3001",
    },
  },
  plugins: [react()],
});
