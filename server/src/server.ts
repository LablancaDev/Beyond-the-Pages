// * SERVIDOR EXPRESS DEL BACKEND *

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import routesServer from './routesServer.js'; //MUY IMPORTANTE al usar ES Modules es necesario para importar correctamente añadir .js ya que Node.js requiere la extensión en el caso de ES Modules.  
import connectDB from './config/config.js'

// Simulación de __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// dotenv.config();

// Conectar a MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares

// Configuración de CORS
const allowedOrigins = [
  'http://localhost:4173', // Tu frontend local en modo desarrollo
  'https://beyound-the-pages.vercel.app' // Dominio de producción en Vercel
];

app.use(cors({
  origin: function (origin, callback) {
    // Permite solicitudes sin origin (como en postman) o en los dominios permitidos
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,POST,PUT,DELETE',
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
