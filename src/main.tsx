import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './locales/i18n.ts'

// vite-plugin-svg-icons
import 'virtual:svg-icons-register';

import './styles/index.css'

console.log(import.meta.env.VITE_BASE_API)
createRoot(document.getElementById('root')!).render(
  <App />
)
