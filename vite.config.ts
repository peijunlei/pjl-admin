import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// vite-tsconfig-paths
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    port: 3000
  },
  plugins: [
    tsconfigPaths(),
    react()
  ],
})
