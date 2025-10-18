import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ESM Vite config
export default defineConfig({
  plugins: [react()],
})
