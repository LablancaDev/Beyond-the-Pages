import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  root: './', // o "./client" si necesitas configurar la raíz
  plugins: [react()],
  build: {
    outDir: 'dist', // Carpeta de salida para la compilación
  },
})
