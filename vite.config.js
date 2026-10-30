// vite.config.js
// Purpose: Configuration file for the Vite build tool and dev server.
// Enables the React plugin to support JSX transformation and Fast Refresh during development.

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
});
