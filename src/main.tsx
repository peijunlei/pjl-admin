import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './locales/i18n.ts'

// vite-plugin-svg-icons
import 'virtual:svg-icons-register';

import './styles/index.css'


createRoot(document.getElementById('root')!).render(
  <App />
)
