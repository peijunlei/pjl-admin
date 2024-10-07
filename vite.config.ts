import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react-swc'
// vite-tsconfig-paths
import tsconfigPaths from 'vite-tsconfig-paths'

//vite-plugin-svg-icons
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    port: 3000
  },
  plugins: [
    tsconfigPaths(),
    react(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
    }),
  ],
})
