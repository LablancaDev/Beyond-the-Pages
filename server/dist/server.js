import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import routesServer from './routesServer.js';
import connectDB from './config/config.js';
// Simulación de __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Conectar a MongoDB
connectDB();
const app = express();
const PORT = process.env.PORT || 5000;
// Middleware para registrar las solicitudes
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});
// Desactivar CORS temporalmente para pruebas
app.use(cors()); // Permitir todas las solicitudes sin restricciones
app.use(express.json()); // Parsear JSON
// Rutas
app.use('/api/users', routesServer);
app.use('/api/books', routesServer);
// Servir imágenes subidas de forma estática
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
export default app; // Exportamos el servidor para Vercel
