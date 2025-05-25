import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom", // Эмуляция браузера
    globals: true, // Автоматическая подгрузка describe/it/expect
    setupFiles: "./src/test/setup.js", // Файл с настройками
  },
});
