import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "../public",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "feed.html"),
      },
    },
  },

  plugins: [react()],
});