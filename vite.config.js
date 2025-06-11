import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  return {
    base: mode === 'production' ? '/movie-db-app/' : '/',
    plugins: [react()],
  };
});
