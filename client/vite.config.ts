import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  root: './',  // La raíz es la carpeta "client"
  plugins: [react()],
  define: {
    'process.env': process.env // Esto permite el acceso a las variables de entorno en caso de que necesites
  },
  build: {
    outDir: './dist',  // Genera los archivos en ./client/dist
    emptyOutDir: true,  // Limpia el directorio de salida antes de construir
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://beyound-the-pages.vercel.app', // URL de tu backend en producción
        changeOrigin: true,
        
      }
    }
  },
})
