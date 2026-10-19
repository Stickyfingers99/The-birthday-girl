
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/The-birthday-girl/',
  plugins: [
    tailwindcss(),
  ],
})
