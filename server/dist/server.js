// * SERVIDOR EXPRESS DEL BACKEND *
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import routesServer from './routesServer.js'; //MUY IMPORTANTE al usar ES Modules es necesario para importar correctamente añadir .js ya que Node.js requiere la extensión en el caso de ES Modules.  
import connectDB from './config/config.js';
// Simulación de __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// dotenv.config();
// Conectar a MongoDB
connectDB();
const app = express();
const PORT = process.env.PORT || 5000;
// Middlewares
app.use(cors()); // Habilitar CORS
app.use(express.json()); // Parsear JSON
// Rutas
app.use('/api/users', routesServer);
// Servir imágenes subidas de forma estática
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
