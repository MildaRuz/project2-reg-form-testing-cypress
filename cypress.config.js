import react from '@vitejs/plugin-react';
import { defineConfig } from 'cypress';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5177,
    strictPort: true,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
