import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@core": path.resolve(__dirname, "./src/core"),
      "@config": path.resolve(__dirname, "./src/config"),
      "@app": path.resolve(__dirname, "./src/app"),
      "@modules": path.resolve(__dirname, "./src/app/modules"),
      "@components": path.resolve(__dirname, "./src/app/components"),
      "@utils": path.resolve(__dirname, "./src/app/utils"),
      "@store": path.resolve(__dirname, "./src/app/store"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8001",
        changeOrigin: true,
      },
    },
  },
});
