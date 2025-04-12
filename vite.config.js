import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // Ignore changes in data.json in the public folder
      ignored: ["**/public/data.json"],
    },
  },
});
