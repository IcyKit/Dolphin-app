import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  build: {
    outDir: "../public",
    rollupOptions: {
      input: {
        // main: resolve(__dirname, "index.html"),
        index: "src/main.jsx",
      },
      output: {
        name: "feed.html",
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
