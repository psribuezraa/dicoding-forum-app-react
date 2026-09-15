import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:5173', // Mengikuti port aktif Vite yang sedang berjalan
    video: false,
    supportFile: false,
  },
});
