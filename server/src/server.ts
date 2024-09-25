import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
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

// Define las orígenes permitidos
const allowedOrigins = [
    'http://localhost:4173', // Tu frontend local en modo desarrollo
    'https://beyound-the-pages.vercel.app' // Dominio de producción en Vercel 
];

// Configuración de CORS
app.use(cors({
    origin: function (origin, callback) {
        console.log(`Incoming request from origin: ${origin}`); // Log para comprobar el origen
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.error(`CORS error: Origin not allowed: ${origin}`); // Log de error de CORS
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,POST,PUT,DELETE,OPTIONS', // Asegúrate de incluir OPTIONS
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'], // Especifica los encabezados que permitirás
    credentials: true
}));

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
