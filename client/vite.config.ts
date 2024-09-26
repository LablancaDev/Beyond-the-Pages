import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  root: './',  // La raíz es la carpeta "client"
  plugins: [react()],
  define: {
    'process.env': process.env
  },
  build: {
    outDir: './dist',  // Genera los archivos en ./client/dist
    emptyOutDir: true,  // Limpia el directorio de salida antes de construir
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // El backend local en modo desarrollo
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  base: '/', 
})
